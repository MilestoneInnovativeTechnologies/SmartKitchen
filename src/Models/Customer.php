<?php

namespace Milestone\SmartKitchen\Models;

use Spatie\MediaLibrary\HasMedia;

class Customer extends Model implements HasMedia
{

    protected $hidden = ['created_at','updated_at'];

    public function Tokens(){ return $this->hasMany(Token::class,'customer','id'); }
    public function Bills(){ return $this->hasMany(Bill::class,'customer','id'); }

}
