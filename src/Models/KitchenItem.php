<?php

namespace Milestone\SmartKitchen\Models;

class KitchenItem extends Model
{

    public function Item(){ return $this->belongsTo(Item::class,'item','id'); }
    public function Kitchen(){ return $this->belongsTo(Kitchen::class,'kitchen','id'); }

}
