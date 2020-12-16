<?php

namespace Milestone\SmartKitchen\Models;

class Price extends Model
{

    protected $hidden = ['created_at','updated_at'];
    public function Item(){ return $this->belongsTo(Item::class,'item','id'); }
    public function List(){ return $this->belongsTo(PriceList::class,'price_list','id'); }

}
