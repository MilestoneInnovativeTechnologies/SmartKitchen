<?php

namespace Milestone\SmartKitchen\Models;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Customer extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $hidden = ['created_at','updated_at'];
    protected $appends = ['image'];

    public function Tokens(){ return $this->hasMany(Token::class,'customer','id'); }
    public function Bills(){ return $this->hasMany(Bill::class,'customer','id'); }

}
