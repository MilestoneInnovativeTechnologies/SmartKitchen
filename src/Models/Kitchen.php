<?php

namespace Milestone\SmartKitchen\Models;

class Kitchen extends Model
{

    public function Items(){ return $this->hasMany(KitchenItem::class,'kitchen','id'); }

}
