<?php

namespace Milestone\SmartKitchen\Models;

use Milestone\SmartKitchen\Scopes\ActiveOnlyScope;

class Payment extends Model
{
    protected static function booted(){ static::addGlobalScope(new ActiveOnlyScope); }

    public function Bill(){ return $this->belongsTo(Bill::class,'bill','id'); }
}
