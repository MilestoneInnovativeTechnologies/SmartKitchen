<?php

namespace Milestone\SmartKitchen\Models;

class Kitchen extends Model
{
    protected $hidden = ['created_at','updated_at'];

    public function Items(){ return $this->hasMany(KitchenItem::class,'kitchen','id'); }
    public function Active(){ return $this->hasOne(KitchenStatus::class,'kitchen','id'); }

}
