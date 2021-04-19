<?php

namespace Milestone\SmartKitchen\Models;

class PriceList extends Model
{

    protected static function booted(){
        static::created(function ($PL){
            $PL->Items()->createMany(array_map(function($item){ return compact('item'); },Item::pluck('id')->toArray()));
        });
    }

    protected $hidden = ['created_at','updated_at'];
    public function Items(){ return $this->hasMany(Price::class,'price_list','id')->with(['Item']); }
    public function Seats(){ return $this->hasMany(Seating::class,'price_list','id'); }
    public function Tokens(){ return $this->hasMany(Token::class,'price_list','id'); }

}
