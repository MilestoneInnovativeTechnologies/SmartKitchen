<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Events\BillUpdated;
use Milestone\SmartKitchen\Jobs\TryMakingBillAsCancelled;
use Milestone\SmartKitchen\Scopes\NotCancelledScope;

class Bill extends Model
{
    private static $timingRequests = ['user','comment'];

    protected static function booted(){
        static::addGlobalScope(new NotCancelledScope);
        static::creating(function ($Bill){
            $Bill->progress_timing = [['progress' => 'Pending','time' => time(),'user' => $Bill->user ?? Auth::id(), 'auth' => Auth::id()]];
            Bill::where('token',$Bill->token)->where('progress','!=','Cancelled')->get()->each(function($bill){ TryMakingBillAsCancelled::dispatch($bill->id); });
        });
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

    protected $dispatchesEvents = [
        'updated' => BillUpdated::class
    ];

    public function scopeRecent($Q){
        return $Q->where('updated_at','>=',fetch_from_date());
    }

    protected $casts = [
        'progress_timing'   =>  'array',
        'contents'          =>  'array',
    ];

    public function Customer(){ return $this->belongsTo(Customer::class,'customer','id'); }
    public function Token(){ return $this->belongsTo(Token::class,'token','id'); }
    public function Payments(){ return $this->hasMany(Payment::class,'bill','id')->where('status','Active'); }
    public function User(){ return $this->belongsTo(User::class,'user','id'); }

    public static function fetch($after,$before,$lid){
        return self::recent()->sync($after,$before,$lid)->take(data_limit())->get();
    }

    public function print($props = []){ Token::find($this->token)->print(array_merge($props,['item' => 'Bill'])); }
    public function print_data($data){ $Token = Token::find($data->token); return $Token->print_data($Token); }

}
