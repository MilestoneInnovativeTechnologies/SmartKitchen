<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Scopes\NotCancelledScope;

class Bill extends Model
{
    private static $timingRequests = ['user','comment'];

    protected static function booted(){
        static::addGlobalScope(new NotCancelledScope);
        static::creating(function ($Bill){ if(!$Bill->user) $Bill->user = Auth::id(); $Bill->progress_timing = [['Pending' => time(),'user' => $Bill->user ?? Auth::id(), 'auth' => Auth::id()]]; });
        static::updating(function ($Bill){
            if($Bill->isDirty('progress')){
                $timings = $Bill->progress_timing ?: [];
                $data = [$Bill->progress => time(), 'auth' => Auth::id()];
                foreach (self::$timingRequests as $input) if(request()->input($input)) $data[$input] = request()->input($input);
                array_push($timings,$data);
                $Bill->progress_timing = $timings;
            }
        });
    }

    protected $casts = [
        'progress_timing'   =>  'array',
    ];

    public function Customer(){ return $this->belongsTo(Customer::class,'customer','id'); }
    public function Token(){ return $this->belongsTo(Token::class,'token','id'); }
    public function Payments(){ return $this->hasMany(Payment::class,'bill','id')->where('status','Active'); }

}
