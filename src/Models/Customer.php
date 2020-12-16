<?php

namespace Milestone\SmartKitchen\Models;

class Customer extends Model
{

    protected $hidden = ['created_at','updated_at'];

    public function Tokens(){ return $this->hasMany(Token::class,'customer','id'); }
    public function Bills(){ return $this->hasMany(Bill::class,'customer','id'); }

}
