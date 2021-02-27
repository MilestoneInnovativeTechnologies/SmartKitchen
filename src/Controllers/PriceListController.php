<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Price;
use Milestone\SmartKitchen\Models\PriceList;

class PriceListController extends Controller
{

    public static function data(){
        return request(['name','detail','status']);
    }

    public static function create(){
        $item = new PriceList(self::data()); $item->save();
        return $item;
    }

    public function update(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = PriceList::find(request()->input('id'));
        $item->update(self::data());
        return $item->fresh();
    }

    public function manage(){
        $pl = $this->update();
        if(request()->filled('items')){
            self::items($pl,request()->input('items'));
        } elseif (request()->filled('duplicate')){
            self::items($pl,Price::where('price_list',request()->input('duplicate'))->pluck('price','item')->toArray());
        }
        return $pl->fresh();
    }

    public static function items($pl,$items){
        if(empty($items)) return;
        foreach ($items as $item => $price)
            $pl->Items()->where('item',$item)->update(['price' => $price]);
    }

}
