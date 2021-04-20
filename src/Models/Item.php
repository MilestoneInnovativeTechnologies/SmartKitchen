<?php

namespace Milestone\SmartKitchen\Models;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Item extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected static function booted(){
        static::created(function ($Item){
            $Item->Price()->createMany(array_map(function($price_list){ return compact('price_list'); },PriceList::pluck('id')->toArray()));
        });
        static::updated(function ($Item){
            $item = $Item->id;
            if(!empty(Kitchen::getClouds()) && KitchenItem::where(['item' => $item])->whereIn('kitchen',Kitchen::getClouds())->exists()){ Sync::add('item',$item,'create'); }
        });
    }

    protected $hidden = ['created_at','updated_at'];
    protected $appends = ['image','props'];

    public function Price(){ return $this->hasMany(Price::class,'item'); }
    public function Token(){ return $this->hasMany(TokenItem::class,'item'); }
    public function Kitchens(){ return $this->hasMany(KitchenItem::class,'item'); }

    private static $props = null;
    public function getPropsAttribute(){
        $props = [];
        if(is_null(self::$props)) self::$props = ItemProp::all()->mapWithKeys(function($itemProp){ return ['prop' . $itemProp->id => $itemProp->name]; })->toArray();
        foreach (self::$props as $prop => $name) $props[$name] = $this->$prop;
        return $props;
    }

}
