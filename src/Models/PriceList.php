<?php

namespace Milestone\SmartKitchen\Models;

class PriceList extends Model
{

    public function Items(){ return $this->hasMany(Price::class,'price_list','id')->with(['Item']); }
    public function Seats(){ return $this->hasMany(Seating::class,'price_list','id'); }
    public function Tokens(){ return $this->hasMany(Token::class,'price_list','id'); }

}
