<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class TokenItem extends Model
{
    private static $timingRequests = ['user','comment'];

    protected static function booted(){
        /*static::addGlobalScope('token',function(Builder $builder){
            if(auth()->user() && auth()->user()->role === 'Waiter') $builder->whereHas('Token',function($Q){ return $Q->own()->active(); });
            else $builder->whereHas('Token',function($Q){ return $Q->active(); });
        });*/
        static::creating(function ($Item){ $Item->progress_timing = [[ 'status' => 'New', 'time' => time(),'user' => $Item->user, 'auth' => Auth::id()]]; });
        static::updating(function ($Item){
            if($Item->isDirty('progress')){
                $timings = $Item->progress_timing ?: [];
                $data = ['status' => $Item->progress, 'time' => time(), 'auth' => Auth::id()];
                foreach (self::$timingRequests as $input) if(request()->input($input)) $data[$input] = request()->input($input);
                array_push($timings,$data);
                if(!$Item->user && Auth::id() && Auth::user()->role !== 'Chef') $Item->user = Auth::id();
                $Item->progress_timing = $timings;
            }
        });
    }

    protected $casts = [
        'progress_timing' => 'array'
    ];

    protected $hidden = ['created_at','updated_at'];
    protected $touches = ['Token'];

    public function Item(){ return $this->belongsTo(Item::class,'item','id'); }
    public function User(){ return $this->belongsTo(User::class,'user','id'); }
    public function Token(){ return $this->belongsTo(Token::class,'token','id'); }
    public function Kitchen(){ return $this->belongsTo(Kitchen::class,'kitchen','id'); }
}
