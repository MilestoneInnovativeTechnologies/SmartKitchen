<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;

class Customer extends Model implements HasMedia
{

    protected $hidden = ['created_at','updated_at'];
    protected $appends = ['image'];

    public function Tokens(){ return $this->hasMany(Token::class,'customer','id'); }
    public function Bills(){ return $this->hasMany(Bill::class,'customer','id'); }

}
