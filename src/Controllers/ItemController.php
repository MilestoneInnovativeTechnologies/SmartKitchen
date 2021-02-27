<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\ItemGroup;

class ItemController extends Controller
{

    public static function data(){
        return request(['name','detail','status','items']);
    }

    public static function create(){
        $item = new Item(self::data()); $item->save();
        return $item;
    }

    public function manage(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = Item::find(request()->input('id'));
        $item->update(self::data());
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

}
