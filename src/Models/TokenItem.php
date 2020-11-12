<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Facades\Auth;

class TokenItem extends Model
{
    private static $timingRequests = ['user','comment'];

    protected static function booted(){
        static::creating(function ($Item){ $Item->progress_timing = [[ 'status' => 'New', 'time' => time(),'user' => $Item->user, 'auth' => Auth::id()]]; });
        static::updating(function ($Item){
            if($Item->isDirty('progress')){
                $timings = $Item->progress_timing ?: [];
                $data = ['status' => $Item->progress, 'time' => time(), 'auth' => Auth::id()];
                foreach (self::$timingRequests as $input) if(request()->input($input)) $data[$input] = request()->input($input);
                array_push($timings,$data);
                $Item->progress_timing = $timings;
            }
        });
    }

    protected $casts = [
        'progress_timing' => 'array'
    ];

    public function Item(){ return $this->belongsTo(Item::class,'item','id'); }
    public function User(){ return $this->belongsTo(User::class,'user','id'); }
    public function Token(){ return $this->belongsTo(Token::class,'token','id'); }
    public function Kitchen(){ return $this->belongsTo(Kitchen::class,'kitchen','id'); }
}
