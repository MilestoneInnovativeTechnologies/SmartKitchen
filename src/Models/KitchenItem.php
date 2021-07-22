<?php

namespace Milestone\SmartKitchen\Models;

use Milestone\SmartKitchen\Events\KitchenItemDeleted;
use Milestone\SmartKitchen\Events\KitchenItemSaved;

class KitchenItem extends Model
{

    protected $hidden = ['created_at','updated_at'];
    public function Item(){ return $this->belongsTo(Item::class,'item','id'); }
    public function Kitchen(){ return $this->belongsTo(Kitchen::class,'kitchen','id'); }

    protected static function booted(){
        static::saved(function($item){ KitchenItemSaved::dispatch($item,$item->kitchen,$item->item); });
        static::deleted(function($item){ KitchenItemDeleted::dispatch($item,$item->kitchen,$item->item); });
    }

}
