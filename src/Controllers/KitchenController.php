<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenItem;

class KitchenController extends Controller
{
    public function item(Request $request){
        $ki_data = $request->only(['item','stock','duration','auto_process']);
        if($request->has('kitchen')){
            $kitchen = Kitchen::find($request->input('kitchen'));
            $kitchen_item = new KitchenItem($ki_data);
            $kitchen->Items()->save($kitchen_item);
            return KitchenItem::where(['kitchen' => $request->input('kitchen'), 'item' => $ki_data['item']])->first();
        } elseif($request->has('id')) {
            $kitchen_item = KitchenItem::find($request->input('id'));
            $kitchen_item->update($ki_data);
            return $kitchen_item;
        }
        return [];
    }
}
