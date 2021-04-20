<?php

namespace Milestone\SmartKitchen\Models;

class KitchenItem extends Model
{

    protected $hidden = ['created_at','updated_at'];
    public function Item(){ return $this->belongsTo(Item::class,'item','id'); }
    public function Kitchen(){ return $this->belongsTo(Kitchen::class,'kitchen','id'); }

    protected static function booted(){
        static::created(function($KitchenItem){
            $kitchen = $KitchenItem->kitchen; if(!in_array($kitchen,Kitchen::getClouds())) return;
            Sync::add('kitchen',$kitchen,'item_details');
            Sync::add('kitchen',$kitchen,'items');
        });
        static::updated(function($KitchenItem){
            $kitchen = $KitchenItem->kitchen; if(!in_array($kitchen,Kitchen::getClouds())) return;
            Sync::add('kitchen',$kitchen,'items');
        });
        static::deleted(function($KitchenItem){
            $kitchen = $KitchenItem->kitchen; if(!in_array($kitchen,Kitchen::getClouds())) return;
            Sync::add('kitchen',$kitchen,'items');
        });
    }

}
