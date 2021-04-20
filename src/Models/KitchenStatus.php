<?php

namespace Milestone\SmartKitchen\Models;

class KitchenStatus extends Model
{

    protected static function booted(){
        static::saving(function($KitchenStatus){
            $KitchenStatus->status = empty($KitchenStatus->users) ? 'Inactive' : 'Active';
        });
        static::saved(function($KitchenStatus){
            $kitchen = $KitchenStatus->kitchen;
            if(in_array($kitchen,Kitchen::getClouds())) Sync::add('kitchen',$kitchen,'status');
        });
    }

    protected $casts = [
        'users' => 'array'
    ];

    public function Kitchen(){ return $this->belongsTo(Kitchen::class,'kitchen','id'); }

}
