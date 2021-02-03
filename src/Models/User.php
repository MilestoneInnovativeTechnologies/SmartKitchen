<?php

namespace Milestone\SmartKitchen\Models;

use App\Models\User as BaseUser;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends BaseUser implements JWTSubject
{

    protected $fillable = ['name','email','login','password','role'];
    protected $hidden = ['created_at','updated_at','password', 'remember_token','email_verified_at','email'];

    public function Logs(){ return $this->hasMany(UserLogin::class,'user','id'); }
    public function Tokens(){ return $this->hasMany(Token::class,'user','id'); }
    public function Log(){ return $this->hasOne(UserLogin::class,'user','id')->where('out',0); }

    public function getJWTIdentifier(){ return $this->getKey(); }
    public function getJWTCustomClaims(){ return []; }

}
