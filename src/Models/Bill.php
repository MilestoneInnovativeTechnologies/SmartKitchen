<?php

namespace Milestone\SmartKitchen\Models;

use Milestone\SmartKitchen\Scopes\NotCancelledScope;

class Bill extends Model
{

    protected static function booted(){ static::addGlobalScope(new NotCancelledScope); }

    public function Customer(){ return $this->belongsTo(Customer::class,'customer','id'); }
    public function Token(){ return $this->belongsTo(Token::class,'token','id'); }
    public function Payments(){ return $this->hasMany(Payment::class,'bill','id'); }

}
