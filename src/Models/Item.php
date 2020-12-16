<?php

namespace Milestone\SmartKitchen\Models;

class Item extends Model
{

    protected $hidden = ['created_at','updated_at'];

    public function Price(){ return $this->hasMany(Price::class,'item'); }
    public function Token(){ return $this->hasMany(TokenItem::class,'item'); }
    public function Kitchens(){ return $this->hasMany(KitchenItem::class,'item'); }

}
