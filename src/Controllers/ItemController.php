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
                        $items[] = $item_id;
                        $group->items = array_unique($items);
                        $group->save();
                    }
                } else {
                    if(in_array($item_id,$items)){
                        $group->items = array_unique(array_diff($items,[$item_id]));
                        $group->save();
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

}
