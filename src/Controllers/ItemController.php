<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\ItemGroup;
use Milestone\SmartKitchen\Models\ItemProp;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\Price;

class ItemController extends Controller
{

    public static function data(){
        return request(['name','detail','status','items']);
    }
    public static function prop_data(){
        return ItemProp::all()->mapWithKeys(function($itemProp){
            return ['prop' . $itemProp->id => request()->input($itemProp->name)];
        })->toArray();
    }

    public static function create(){
        $item = new Item(self::data()); $item->save();
        $pData = self::prop_data(); if($pData) $item->update($pData);
        $item->update(self::prop_data());
        return $item->fresh();
    }

    public function manage(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = Item::find(request()->input('id'));
        $item->update(self::data());
        $pData = self::prop_data(); if($pData) $item->update($pData);
        request()->whenHas('groups',function($groups)use($item){
            $item_id = $item->id;
            ItemGroup::all()->each(function($group)use($item_id,$groups){
                $items = $group->items; $group_id = $group->id;
                if(in_array($group_id,$groups)){
                    if(!in_array($item_id,$items)){
                        $items[] = $item_id; $items = array_values(array_unique($items));
                        sort($items); $group->items = $items;
                        $group->save();
                    }
                } else {
                    if(in_array($item_id,$items)){
                        $items = array_values(array_unique(array_diff($items,[$item_id])));
                        sort($items); $group->items = $items; $group->save();
                    }
                }
            });
        });
        \request()->whenHas('prices',function($prices)use($item){
            $item_id = $item->id;
            foreach ($prices as $price_list => $price){
                Price::updateOrCreate(['item' => $item_id, 'price_list' => $price_list],['price' => $price]);
            }
        });
        \request()->whenHas('stocks',function($stocks)use($item){
            $item_id = $item->id;
            Kitchen::all()->each(function($Kitchen)use($item_id,$stocks){
                $kitchen_id = $Kitchen->id;
                if(array_key_exists($kitchen_id,$stocks)){
                    KitchenItem::updateOrCreate(['kitchen' => $kitchen_id, 'item' => $item_id],$stocks[$kitchen_id]);
                } else {
                    KitchenItem::where(['kitchen' => $kitchen_id, 'item' => $item_id])->delete();
                }
            });
        });
        return $item->fresh();
    }

    public function group(){
        if(!request()->has('id') || !request()->filled('id')){
            $group = new ItemGroup(self::data()); $group->save(); return $group;
        } else {
            $group = ItemGroup::find(request()->input('id'));
            $group->update(self::data());
            return $group->fresh();
        }
    }

    public function prop(){
        if(!request()->has('id') || !request()->filled('id')){
            $prop = new ItemProp(self::data()); $prop->save(); return $prop;
        } else {
            $prop = ItemProp::find(request()->input('id'));
            $prop->update(self::data());
            return $prop->fresh();
        }
    }

    public function instant(Request $request){
        $name = $request->input('name'); if(!$name) return;
        $Item = Item::create(compact('name')); $item = $Item->id;
        $request->whenFilled('group',function ($group)use ($item){
            $Group = ItemGroup::find($group); $items = $Group->items;
            $items[] = $item; $items = array_values(array_unique($items));
            sort($items); $Group->items = $items; $Group->save();
        });
        $request->whenFilled('kitchen',function ($kitchen)use ($item){
            $KIS = KitchenItem::where(['kitchen' => $kitchen])->get(); $AP = $KIS->countBy('auto_process'); $AC = $KIS->countBy('auto_complete');
            $stock = 100; $duration = 180;
            $auto_process = (Arr::get($AP,'Yes',0) > Arr::get($AP,'No',0)) ? 'Yes' : 'No';
            $auto_complete = (Arr::get($AC,'Yes',0) > Arr::get($AC,'No',0)) ? 'Yes' : 'No';
            KitchenItem::updateOrCreate(compact('kitchen','item'),compact('stock','duration','auto_process','auto_complete'));
        });
        $request->whenFilled('prices',function ($prices)use ($item){
            foreach ($prices as $price_list => $price)
            Price::updateOrCreate(compact('price_list','item'),compact('price'));
        });
    }

}
