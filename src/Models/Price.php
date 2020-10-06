<?php

namespace Milestone\SmartKitchen\Models;

class Price extends Model
{

    public function Item(){ return $this->belongsTo(Item::class,'item','id'); }
    public function List(){ return $this->belongsTo(PriceList::class,'price_list','id'); }

}
