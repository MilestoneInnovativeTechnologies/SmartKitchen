<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\ItemGroup;
use Milestone\SmartKitchen\Models\ItemProp;

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
