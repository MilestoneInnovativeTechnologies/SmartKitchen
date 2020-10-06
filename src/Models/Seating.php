<?php

namespace Milestone\SmartKitchen\Models;

class Seating extends Model
{
    protected $table = 'seating';
    public function Tokens(){ return $this->hasMany(Token::class,'seating','id'); }
    public function Bills(){ return $this->hasMany(Bill::class,'seating','id'); }
}
