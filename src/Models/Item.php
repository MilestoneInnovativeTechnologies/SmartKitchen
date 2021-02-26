<?php

namespace Milestone\SmartKitchen\Models;

use Spatie\MediaLibrary\HasMedia;

class Item extends Model implements HasMedia
{
    protected static function booted(){
        static::created(function ($Item){
            $Item->Price()->createMany(array_map(function($price_list){ return compact('price_list'); },PriceList::pluck('id')->toArray()));
        });
    }

    protected $hidden = ['created_at','updated_at'];

    public function Price(){ return $this->hasMany(Price::class,'item'); }
    public function Token(){ return $this->hasMany(TokenItem::class,'item'); }
    public function Kitchens(){ return $this->hasMany(KitchenItem::class,'item'); }

}
