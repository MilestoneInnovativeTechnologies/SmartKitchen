<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Scopes\NotCancelledScope;
use Milestone\SmartKitchen\Traits\TokenPrintTrait;

class Token extends Model
{
    use TokenPrintTrait;

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
            if(!$Token->user && Auth::id() && Auth::user()->role !== 'Chef') $Token->user = Auth::id();
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
        return $Q->where('user',auth()->id())->orWhere(function($Q){ $Q->whereNull('user')->where('type','Dining'); });
    }
    public function scopeToday($Q){
        return $Q->where('created_at','>=',now()->startOfDay()->toDateTimeString());
    }
    public function scopeRecent($Q){
        return $Q->where('updated_at','>=',fetch_from_date());
    }
    public function scopeActive($Q){
        return $Q
            ->where('progress','!=','Billed')
            ->orWhere(function($q1){ $q1->where('progress','Billed')->where('updated_at','>',fetch_from_date()); })
            ->orWhere(function($q1){ $q1->where('type','Remote')->whereNotIn('progress',['Billed','Cancelled'])->whereHas('Items',function($q2){ $q2->withoutGlobalScope('token')->where('deliver','>=',now()->toDateTimeString()); }); });
    }

    public function Customer(){ return $this->belongsTo(Customer::class,'customer','id'); }
    public function Seating(){ return $this->belongsTo(Seating::class,'seating','id'); }
    public function User(){ return $this->belongsTo(User::class,'user','id'); }
    public function PriceList(){ return $this->belongsTo(PriceList::class,'price_list','id'); }
    public function Items(){ return $this->hasMany(TokenItem::class,'token','id'); }
    public function Bill(){ return $this->hasOne(Bill::class,'token','id')->where('progress','!=','Cancelled'); }

    public static function fetch($after,$before,$lid){
        return (auth()->user() && auth()->user()->role === 'Waiter')
            ? self::own()->active()->sync($after,$before,$lid)->get()
            : self::active()->sync($after,$before,$lid)->take(data_limit())->get();
    }

    public function print($props = []) {
        $props = $this->print_printer_name($props);
        $props = $this->print_template_name($props);
        return parent::print($props);
    }

}
