<?php

namespace Milestone\SmartKitchen\Models;

class UserLogin extends Model
{

    public function User(){ return $this->belongsTo(User::class,'user'); }

}
