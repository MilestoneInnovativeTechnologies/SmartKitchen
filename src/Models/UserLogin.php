<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Log;
use Milestone\SmartKitchen\Jobs\ChefLogOut;
use Milestone\SmartKitchen\Jobs\LogInSection;

class UserLogin extends Model
{
    protected static function booted(){
        static::created(function($LoginUser){
            Log::info('Login log inserted!');
            if(!$LoginUser->out && $LoginUser->section)
                LogInSection::dispatch($LoginUser);
        });
        static::updated(function($LoginUser){
            Log::info('Login log updated!');
            if($LoginUser->wasChanged('out') && $LoginUser->out > 0)
                ChefLogOut::dispatch($LoginUser->user);
        });
    }

    protected $casts = [
        'section' => 'array',
    ];

    public function User(){ return $this->belongsTo(User::class,'user'); }

}
