<?php

namespace Milestone\SmartKitchen\Models;

use Spatie\MediaLibrary\HasMedia;

class PriceList extends Model implements HasMedia
{

    protected $hidden = ['created_at','updated_at'];
    public function Items(){ return $this->hasMany(Price::class,'price_list','id')->with(['Item']); }
    public function Seats(){ return $this->hasMany(Seating::class,'price_list','id'); }
    public function Tokens(){ return $this->hasMany(Token::class,'price_list','id'); }

}
