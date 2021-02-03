<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Scopes\NotCancelledScope;

class Bill extends Model
{
    private static $timingRequests = ['user','comment'];

    protected static function booted(){
        static::addGlobalScope(new NotCancelledScope);
        static::creating(function ($Bill){ if(!$Bill->user) $Bill->user = Auth::id(); $Bill->progress_timing = [['progress' => 'Pending','time' => time(),'user' => $Bill->user ?? Auth::id(), 'auth' => Auth::id()]]; });
        static::updating(function ($Bill){
            if($Bill->isDirty('progress')){
                $timings = $Bill->progress_timing ?: [];
                $data = ['progress' => $Bill->progress, 'time' => time(), 'auth' => Auth::id()];
                foreach (self::$timingRequests as $input) if(request()->input($input)) $data[$input] = request()->input($input);
                array_push($timings,$data);
                $Bill->progress_timing = $timings;
            }
        });
    }

    public function scopeRecent($Q){
        return $Q->where('created_at','>=',now()->subDays(5)->startOfDay()->toDateTimeString());
    }

    protected $casts = [
        'progress_timing'   =>  'array',
        'contents'          =>  'array',
    ];

    public function Customer(){ return $this->belongsTo(Customer::class,'customer','id'); }
    public function Token(){ return $this->belongsTo(Token::class,'token','id'); }
    public function Payments(){ return $this->hasMany(Payment::class,'bill','id')->where('status','Active'); }

    public static function fetch($after,$before,$lid){
        return self::recent()->sync($after,$before,$lid)->get();
    }

}
