<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Scopes\NotCancelledScope;

class Token extends Model
{
    private static $timingRequests = ['user','comment'];
    public static $summableProgress = ['New','Accepted','Processing','Completed','Served'];

    protected static function booted(){
        static::addGlobalScope(new NotCancelledScope);
        static::creating(function ($Token){ $Token->progress_timing = [['progress' => 'New', 'time' => time(),'user' => $Token->user, 'auth' => Auth::id()]]; });
        static::updating(function ($Token){
            if($Token->isDirty('progress')){
                $timings = $Token->progress_timing ?: [];
                $data = ['progress' => $Token->progress, 'time' => time(), 'auth' => Auth::id()];
                foreach (self::$timingRequests as $input) if(request()->input($input)) $data[$input] = request()->input($input);
                array_push($timings,$data);
                $Token->progress_timing = $timings;
            }
        });
    }

    protected $casts = [
        'progress_timing'   =>  'array',
    ];

    public function Customer(){ return $this->belongsTo(Customer::class,'customer','id'); }
    public function Seating(){ return $this->belongsTo(Seating::class,'seating','id'); }
    public function User(){ return $this->belongsTo(User::class,'user','id'); }
    public function PriceList(){ return $this->belongsTo(PriceList::class,'price_list','id'); }
    public function Items(){ return $this->hasMany(TokenItem::class,'token','id'); }
    public function Bill(){ return $this->hasOne(Bill::class,'token','id')->where('progress','!=','Cancelled'); }

}
