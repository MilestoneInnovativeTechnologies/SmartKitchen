<?php

namespace Milestone\SmartKitchen\Models;

class KitchenStatus extends Model
{

    protected static function booted(){
        static::saving(function($KitchenStatus){
            $users = $KitchenStatus->users; $full_timer = $KitchenStatus->full_timer;
            if(!empty($full_timer) && !in_array($full_timer,$users)) {
                array_push($users,$full_timer);
                $KitchenStatus->users = $users;
            }
            $KitchenStatus->status = empty($KitchenStatus->users) ? 'Inactive' : 'Active';
        });
    }

    protected $casts = [
        'users' => 'array'
    ];

    public function Kitchen(){ return $this->belongsTo(Kitchen::class,'kitchen','id'); }

}
