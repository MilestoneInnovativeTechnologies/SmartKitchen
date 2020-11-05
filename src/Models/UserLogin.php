<?php

namespace Milestone\SmartKitchen\Models;

class UserLogin extends Model
{
    protected static function booted(){
        static::created(function(){ Log::info('Login log inserted!'); });
        static::updated(function(){ Log::info('Login log updated!'); });
    }

    protected $casts = [
        'section' => 'array',
    ];

    public function User(){ return $this->belongsTo(User::class,'user'); }

}
