<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Scopes\NotCancelledScope;

class Bill extends Model
{
    private static $timingRequests = ['user','comment'];

    public $printer_name = 'bill_printer';
    public $print_template = 'bill_print_template';

    protected static function booted(){
        static::addGlobalScope(new NotCancelledScope);
        static::creating(function ($Bill){ $Bill->progress_timing = [['progress' => 'Pending','time' => time(),'user' => $Bill->user ?? Auth::id(), 'auth' => Auth::id()]]; });
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
    public function User(){ return $this->belongsTo(User::class,'user','id'); }

    public static function fetch($after,$before,$lid){
        return self::recent()->sync($after,$before,$lid)->get();
    }

    public function print_data($data){
        $data->load(['Token' => function($Q){ $Q->with(['Seating','User']); },'User','Customer']);
        $data->setAttribute('date_human',human_date($data->date));
        $data->setAttribute('date_human2',human_date2($data->date));
        $data->setAttribute('time_human',human_time($data->date));
        $data->setAttribute('amount_precise',precise($data->amount));
        $data->setAttribute('discount_precise',precise($data->discount));
        $data->setAttribute('round_precise',precise($data->round));
        $data->setAttribute('payable_precise',precise($data->amount - $data->discount));
        $data->setAttribute('payable_number',precise($data->amount - $data->discount,2,""));
        $data = $data->toArray(); $taxes = [];
        foreach($data['contents'] as $cKey => $content){
            $data['contents'][$cKey]['price_precise'] = precise($content['price']);
            $data['contents'][$cKey]['discount_precise'] = precise($content['discount']);
            $data['contents'][$cKey]['amount_precise'] = precise($content['price'] * $content['quantity']);
            $data['contents'][$cKey]['tax']['price_precise'] = precise($content['tax']['price']);
            $data['contents'][$cKey]['tax']['amount_precise'] = precise($content['tax']['amount']);
            if(!array_key_exists($content['tax']['name'],$taxes)) $taxes[$content['tax']['name']] = ['taxable' => 0, 'tax' => 0, 'percent' => $content['tax']['percent']];
            $taxes[$content['tax']['name']]['taxable'] += floatval($content['tax']['price']) * floatval($content['tax']['quantity']);
            $taxes[$content['tax']['name']]['tax'] += floatval($content['tax']['amount']);
            foreach($content['tax']['contents'] as $tKey => $tax){
                $data['contents'][$cKey]['tax']['contents'][$tKey]['amount_precise'] = precise($tax['amount']);
            }
        }
        $data['taxes'] = array_map(function($tax_contents,$name){ return array_merge(array_map(function($amt){ return precise($amt); },$tax_contents),compact('name')); },$taxes,array_keys($taxes));
        $data['taxes_taxable'] = precise(array_sum(array_column($taxes,'taxable')));
        $data['taxes_amount'] = precise(array_sum(array_column($taxes,'tax')));
        return $data;
    }

}
