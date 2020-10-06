<?php

namespace Milestone\SmartKitchen\Models;

use App\Models\User as BaseUser;

class User extends BaseUser
{

    protected $fillable = ['name','email','login','password','role'];

    public function Logins(){ return $this->hasMany(UserLogin::class,'user','id'); }
    public function Tokens(){ return $this->hasMany(Token::class,'user','id'); }

}
