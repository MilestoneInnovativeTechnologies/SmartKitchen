<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Events\PaymentUpdated;
use Milestone\SmartKitchen\Scopes\ActiveOnlyScope;

class Payment extends Model
{
    protected static function booted(){ static::addGlobalScope(new ActiveOnlyScope); }

    public function Bill(){ return $this->belongsTo(Bill::class,'bill','id'); }

    public $printer_name = 'payment_printer';
    public $print_template = 'payment_print_template';

    protected $dispatchesEvents = [
        'updated' => PaymentUpdated::class,
    ];

    public function scopeRecent($Q){
        return $Q->where('updated_at','>=',fetch_from_date());
    }
    public static function fetch($after,$before,$lid){
        return self::recent()->sync($after,$before,$lid)->take(data_limit())->get();
    }

    public function print_data($data){
        $Token = Token::find($data->Bill->token);
        $data->setAttribute('token',$Token->print_data($Token)->toArray());
        $data->setAttribute('date_human',human_date($data->date));
        $data->setAttribute('time_human',human_time($data->date));
        $data->setAttribute('amount_precise',precise($data->amount));
        return $data;
    }

    public function print($props = []){
        $Token = Token::find($this->Bill->token); $props['item'] = 'Payment';
        $props = $Token->print_printer_name($props);
        $props = $Token->print_template_name($props);
        return parent::print($props);
    }

}
