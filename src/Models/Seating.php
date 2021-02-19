<?php

namespace Milestone\SmartKitchen\Models;

use Spatie\MediaLibrary\HasMedia;

class Seating extends Model implements HasMedia
{
    protected $table = 'seating';
    protected $hidden = ['created_at','updated_at'];

    protected $casts = ['seats' => 'array'];

    public function Tokens(){ return $this->hasMany(Token::class,'seating','id'); }
    public function Bills(){ return $this->hasMany(Bill::class,'seating','id'); }
}
