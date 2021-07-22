<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\KitchenStatus;
use Milestone\SmartKitchen\Models\Remote;

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
        $item = Arr::get(Item::create(['name' => $request->item, 'detail' => $request->detail, 'status' => $request->status]),'id'); if(!$item) return 'No Item';
        $kiData = array_merge($request->only(['stock','duration','auto_process','auto_complete']),compact('kitchen','item'));
        $kitchen_item = KitchenItem::create($kiData); if(!$kitchen_item) return 'no ki';
        $remote = Remote::updateOrCreate(['item' => 'kitchen_items','local_id' => $kitchen_item->id],['reference' => $request->reference, 'location' => $request->_location, 'monitor' => $request->_monitor ? 'Yes' : 'No']);
        return compact('kitchen_item','remote');
    }

    public function tokens(Request $request){
        $items = $request->items;
        foreach($items as $idx => $req){
            $ki_ref = $req['kitchen_item_reference'];
            $item = self::ki_ref_item($ki_ref);
            if(!$item) unset($items[$idx]);
            else $items[$idx]['item'] = $item;
        }
        if(empty($items)) return 'NO ITEMS';
        $request->merge(['type' => 'Remote','price_list' => 1, 'items' => $items]);
        $token_ref = $request->input('reference'); $location = $request->input('_location');
        if(Remote::where('reference',$token_ref)->exists()) return 'ALREADY EXISTS';
        $token = app()->call(TokenController::class,[],'create');
        $token_id = $token->id;
        Remote::updateOrCreate(['item' => 'tokens','local_id' => $token_id],['reference' => $token_ref, 'location' => $location, 'monitor' => $request->_monitor ? 'Yes' : 'No']);
        $token->items->each(function($TokenItem) use($items,$location){
            foreach($items as $rTI){
                if($TokenItem->item === $rTI['item'] && $TokenItem->quantity === $rTI['quantity'] && $TokenItem->narration === $rTI['narration'] && $TokenItem->deliver === $rTI['deliver']){
                    Remote::updateOrCreate(['item' => 'token_items','local_id' => $TokenItem->id],['reference' => $rTI['reference'], 'location' => $location, 'monitor' => 'Yes']);
                }
            }
        });
        return $token->fresh()->load('Items');
    }
    public function token_items(Request $request){
        return $request->all();
    }

    static function ki_ref_item($reference){
        $remote = Remote::where(['item' => 'kitchen_items','reference' => $reference])->first();
        if(!$remote) return null; $ki_local_id = Arr::get($remote,'local_id');
        return Arr::get(KitchenItem::find($ki_local_id),'item',null);
    }
}

