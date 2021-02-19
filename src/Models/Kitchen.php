<?php

namespace Milestone\SmartKitchen\Models;

use Spatie\MediaLibrary\HasMedia;

class Kitchen extends Model implements HasMedia
{
    protected $hidden = ['created_at','updated_at'];

    public function Items(){ return $this->hasMany(KitchenItem::class,'kitchen','id'); }
    public function Active(){ return $this->hasOne(KitchenStatus::class,'kitchen','id'); }

}
