<?php

namespace Milestone\SmartKitchen\Models;

class KitchenStatus extends Model
{

    protected static function booted(){
        static::saving(function($KitchenStatus){
            $KitchenStatus->status = empty($KitchenStatus->users) ? 'Inactive' : 'Active';
        });
    }

    protected $casts = [
        'users' => 'array'
    ];

    public function Kitchen(){ return $this->belongsTo(Kitchen::class,'kitchen','id'); }

}
