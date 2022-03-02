<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\KitchenStatus;
use Milestone\SmartKitchen\Models\Remote;
use Milestone\SmartKitchen\Models\Token;
use Milestone\SmartKitchen\Models\TokenItem;

class RemoteController extends Controller
{

    public function addReference(Request $request){
        if($request->filled(['id','reference'])){
            Remote::find($request->input('id'))->update($request->only(['reference']));
            return $request->input('reference');
        }
        return null;
    }

    public function remove(Request $request){
        if(!$request->filled('id')) return [];
        $id = $request->input('id');
        $remote = Remote::find($id); $remote->update(['monitor' => 'No']);
        return compact('id','remote');
    }

    public function kitchens(Request $request){
        $kitchen = KitchenController::create();
        if($request->online && !empty($request->users)) KitchenStatus::updateOrCreate(['kitchen' => $kitchen->id],['users' => $request->users]);
        $remote = Remote::updateOrCreate(['item' => 'kitchens','local_id' => $kitchen->id],['reference' => $request->reference, 'location' => $request->_location, 'monitor' => $request->_monitor ? 'Yes' : 'No']);
        return compact('kitchen','remote');
    }

    public function kitchen_items(Request $request){
        $kitchen = Arr::get(Remote::where(['item' => 'kitchens', 'reference' => $request->kitchen])->first(),'local_id'); if(!$kitchen) return 'No Kitchen';
        self::remove_kitchen_item_records($request->reference);
        if($request->isNotFilled('id')){
            $rPrices = $request->prices;
            $Item = Item::create(['name' => $request->item, 'detail' => $request->detail, 'status' => $request->status]);
            $Item->Price->each(function($price) use($rPrices){ $price->price = $rPrices[$price->price_list]; $price->save(); });
            $item = $Item->id;
        } else $item = $request->id;
        $kitchen_item = KitchenItem::updateOrCreate(compact('kitchen','item'),$request->only(['stock','duration','auto_process','auto_complete'])); if(!$kitchen_item) return 'no ki';
        $remote = $request->filled('reference') ? Remote::updateOrCreate(['item' => 'kitchen_items','local_id' => $kitchen_item->id],['reference' => $request->reference, 'location' => $request->_location, 'monitor' => $request->_monitor ? 'Yes' : 'No']) : null;
        return compact('kitchen_item','remote');
    }

    public function tokens(Request $request){
        if(!$request->token_reference) return Log::error('Requested to create token by remote controller without token reference');
        usleep(rand(1000000,3000000)); $req = $request->only(['token','token_reference','item','item_id','item_reference','customer_id','location']);
        if(Remote::where(['item' => 'tokens','reference' => $req['token_reference']])->exists()){
            $token_id = Arr::get(Remote::where(['item' => 'tokens','reference' => $req['token_reference']])->first(),'local_id');
            $request->merge($req['token'])->merge(['type' => 'Remote','customer' => $req['customer_id']])->merge(['items' => [array_merge($req['item'],['item' => $req['item_id']])]]);
            $Token = Token::with('Items')->find($token_id);
        } else {
            if(Remote::withoutGlobalScopes()->where(['item' => 'tokens','reference' => $req['token_reference']])->exists()) return Log::warning('Requested to create token which is already cancelled or inaccessible');
            $request->merge($req['token'])->merge(['type' => 'Remote','customer' => $req['customer_id']])->merge(['items' => [array_merge($req['item'],['item' => $req['item_id']])]]);
            $Token = app()->call(TokenController::class . "@create"); $Token->load('Items');
            Remote::updateOrCreate(['item' => 'tokens','location' => $req['location'], 'local_id' => $Token->id],['reference' => $req['token_reference']]);
        }
        $request_item = $req['item'];
        $token_item_id = null; $TokenItem = null;
        $Token->Items->each(function($TokenItem) use($request_item,$req,&$token_item_id){
            if($TokenItem->item !== $req['item_id'] || $TokenItem->quantity !== $request_item['quantity'] || $TokenItem->narration !== $request_item['narration'] || $TokenItem->deliver !== $request_item['deliver']) return true;
            $token_item_id = $TokenItem->id; return false;
        });
        if(!$token_item_id){
            $request->merge($req['item'])->merge(['item' => $req['item_id'],'token' => $Token->id]);
            $TokenItem = app()->call(TokenController::class . "@item");
            $token_item_id = $TokenItem->id;
        }
        Remote::updateOrCreate(['item' => 'token_items','location' => $req['location'], 'local_id' => $token_item_id],['reference' => $req['item_reference']]);
        return ['token' => $Token, 'token_item' => $TokenItem];
    }
    public function token_items(Request $request){
        return $request->all();
    }

    public function offline_order(Request $request){
        if(!$request->filled(['token','item'])) return 'Token or Item missing';
        $token_date = $request->input('token.date'); $token_location = $request->input('token._location');
        $request->merge(['customer' => $request->customer_id,'_location' => $token_location,'kitchen' => $request->input('item.kitchen_id')]);
        usleep(rand(700,3000));
        $token = self::TokensOfDateLocation($token_date,$token_location);
        if(!$token){
            $request->merge($request->token)->merge(['type' => 'Remote'])->merge(['items' => [array_merge($request->item,['item' => $request->item_id])]]);
            $Token = app()->call(TokenController::class . "@create");
            $token_item_id = Arr::get($Token->Items->first(),'id');
        } else {
            $Token = Token::find($token['local_id']); $request_item = $request->input('item');
            if($Token->Items()->where(['item' => $request->item_id,'quantity' => $request_item['quantity'],'deliver' => $request_item['deliver'], 'narration' => $request_item['narration']])->exists()) return 'Token and Item already exists';
            $ti_data = array_merge(Arr::only($request_item,['quantity','deliver','narration']),['item' => $request->item_id,'token' => $token['local_id']]); $request->merge($ti_data);
            $token_item_id = Arr::get(app()->call(TokenController::class . "@item"),'id');
        }
        $request->merge(['reference' => $request->input('offline_reference'),'id' => Arr::get(Remote::where(['item' => 'token_items','local_id' => $token_item_id])->first(),'id')]);
        app()->call(self::class . "@offlineReference");
        return $Token->load('Items');
    }

    public static function TokensOfDateLocation($date,$location){
        $date_tokens = Token::where('date',$date)->get();
        return Remote::where(['item' => 'tokens', 'location' => $location])->whereIn('local_id',$date_tokens->pluck('id')->toArray())->get()->map(function($remote_record)use($date_tokens){
            return array_merge($remote_record->toArray(),$date_tokens->firstWhere('id',$remote_record->local_id)->toArray());
        })->first();
    }

    static function ki_ref_item($reference){
        $remote = Remote::where(['item' => 'kitchen_items','reference' => $reference])->first();
        if(!$remote) return null; $ki_local_id = Arr::get($remote,'local_id');
        return Arr::get(KitchenItem::find($ki_local_id),'item',null);
    }

    static function remove_kitchen_item_records($ki_reference){
        if(!$ki_reference) return;
        KitchenItem::destroy(Remote::where(['item' => 'kitchen_items','reference' => $ki_reference])->pluck('local_id')->toArray());
        Remote::where(['item' => 'kitchen_items','reference' => $ki_reference])->delete();
    }

    public function offlineReference(Request $request){
        if($request->filled(['id','reference'])){
            $remote = Remote::find($request->input('id'));
            $remote->extra = array_merge($remote->extra ?: [], ['offline_reference' => $request->input('reference')]);
            $remote->save();
            if($request->input('kitchen') && TokenItem::where(['id' => $remote->local_id,'progress' => 'New'])->exists()) TokenItemController::Accept($remote->local_id,$request->input('kitchen'),auth()->id());
            return $remote;
        }
        return null;
    }
}

