<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\KitchenStatus;
use Milestone\SmartKitchen\Models\Remote;
use Milestone\SmartKitchen\Models\Token;

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
        usleep(rand(700,3000));
        if(Remote::where(['item' => 'tokens','reference' => $request->token_reference])->exists()){
            $token_id = Arr::get(Remote::where(['item' => 'tokens','reference' => $request->token_reference])->first(),'local_id');
            $Token = Token::with('Items')->find($token_id);
        } else {
            $request->merge($request->token)->merge(['type' => 'Remote','customer' => $request->customer_id])->merge(['items' => [array_merge($request->item,['item' => $request->item_id])]]);
            $Token = app()->call(TokenController::class . "@create"); $Token->load('Items');
            Remote::updateOrCreate(['item' => 'tokens','location' => $request->location, 'local_id' => $Token->id],['reference' => $request->token_reference]);
        }
        $request_item = $request->item;
        $token_item_id = null; $TokenItem = null;
        $Token->Items->each(function($TokenItem) use($request_item,$request,&$token_item_id){
            if($TokenItem->item !== $request->item_id || $TokenItem->quantity !== $request_item['quantity'] || $TokenItem->narration !== $request_item['narration'] || $TokenItem->deliver !== $request_item['deliver']) return true;
            $token_item_id = $TokenItem->id; return false;
        });
        if(!$token_item_id){
            $request->merge($request->item)->merge(['item' => $request->item_id,'token' => $Token->id]);
            $TokenItem = app()->call(TokenController::class . "@item");
            $token_item_id = $TokenItem->id;
        }
        Remote::updateOrCreate(['item' => 'token_items','location' => $request->location, 'local_id' => $token_item_id],['reference' => $request->item_reference]);
        return ['token' => $Token, 'token_item' => $TokenItem];
    }
    public function token_items(Request $request){
        return $request->all();
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

    public function readReference(Request $request){
        if($request->filled(['id','reference'])){
            $remote = Remote::find($request->input('id'));
            $remote->extra = array_merge($remote->extra ?: [], ['r_ref' => $request->input('reference')]);
            $remote->save();
            if($request->input('kitchen')) TokenItemController::Accept($remote->local_id,$request->input('kitchen'),auth()->id());
            return $remote;
        }
        return null;
    }
}

