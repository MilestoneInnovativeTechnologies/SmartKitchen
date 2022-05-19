<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
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
        DB::delete('DELETE p1 FROM prices p1 INNER JOIN prices p2 WHERE p2.id > p1.id AND p1.item = p2.item AND p1.price_list = p2.price_list');
        if(empty($items)) return; $price_list = Arr::get($pl,'id');
        foreach ($items as $item => $price)
            Price::updateOrCreate(compact('price_list','item'),compact('price'));
    }

}
