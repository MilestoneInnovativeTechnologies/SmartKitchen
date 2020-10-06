<?php

namespace Milestone\SmartKitchen\Models;

class TokenItem extends Model
{
    public function Item(){ return $this->belongsTo(Item::class,'item','id'); }
    public function Token(){ return $this->belongsTo(Token::class,'token','id'); }
}
