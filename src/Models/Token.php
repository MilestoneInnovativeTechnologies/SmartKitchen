<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Scopes\NotCancelledScope;

class Token extends Model
{
    private static $timingRequests = ['user','comment'];
    public static $summableProgress = ['New','Accepted','Processing','Completed','Served'];
    public static $fetchMethods = ['Waiter' => 'waiter'];

    public $printer_name = 'token_printer';
    public $print_template = 'token_print_template';


    protected static function booted(){
        static::addGlobalScope(new NotCancelledScope);
        static::creating(function ($Token){
            if(!$Token->price_list && $Token->seating) $Token->price_list = Arr::get(Seating::find($Token->seating),'price_list');
            $Token->progress_timing = [['progress' => 'New', 'time' => time(),'user' => $Token->user, 'auth' => Auth::id()]];
        });
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
    protected $hidden = ['created_at','updated_at'];

    public function scopeOwn($Q){
        return $Q->where('user',auth()->id());
    }
    public function scopeToday($Q){
        return $Q->where('created_at','>=',now()->startOfDay()->toDateTimeString());
    }
    public function scopeRecent($Q){
        return $Q->where('created_at','>=',now()->subDays(5)->startOfDay()->toDateTimeString());
    }
    public function scopeActive($Q){
        return $Q
            ->where('progress','!=','Billed')
            ->orWhere(function($q1){ $q1->where('progress','Billed')->where('updated_at','>',now()->subDays(5)->toDateTimeString()); });
    }

    public function Customer(){ return $this->belongsTo(Customer::class,'customer','id'); }
    public function Seating(){ return $this->belongsTo(Seating::class,'seating','id'); }
    public function User(){ return $this->belongsTo(User::class,'user','id'); }
    public function PriceList(){ return $this->belongsTo(PriceList::class,'price_list','id'); }
    public function Items(){ return $this->hasMany(TokenItem::class,'token','id'); }
    public function Bill(){ return $this->hasOne(Bill::class,'token','id')->where('progress','!=','Cancelled'); }

    public static function fetch($after,$before,$lid){
//        return self::recent()->active()->sync($after,$before,$lid)->get();
        return (auth()->user()->role === 'Waiter')
            ? self::own()->recent()->active()->sync($after,$before,$lid)->get()
            : self::recent()->active()->sync($after,$before,$lid)->get();
    }

    public function print_data($data){
        $data->load(['Items' => function($Q){ $Q->withoutGlobalScopes()->with(['Item','User','Kitchen']); },'User','Seating','Customer']);
        $this->setAttribute('total_items',$data->Items->count());
        $this->setAttribute('total_quantities',$data->Items->sum->quantity);
        $this->setAttribute('date_human',human_date($data->date));
        $this->setAttribute('time_human',human_time($data->date));
        return $data;
    }

}
