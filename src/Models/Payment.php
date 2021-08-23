<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Scopes\ActiveOnlyScope;

class Payment extends Model
{
    public static $recentDays = 7;
    protected static function booted(){ static::addGlobalScope(new ActiveOnlyScope); }

    public function Bill(){ return $this->belongsTo(Bill::class,'bill','id'); }

    public $printer_name = 'payment_printer';
    public $print_template = 'payment_print_template';

    public function scopeRecent($Q){
        return $Q->where('created_at','>=',now()->subRealDays(sk('recent_days_length'))->startOfDay()->toDateTimeString());
    }
    public static function fetch($after,$before,$lid){
        return self::recent()->sync($after,$before,$lid)->get();
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
        $printer_name = Str::snake((auth()->user() ? auth()->user()->role : '') . 'Payment Printer');
        $printer_name = Settings::where('name',$printer_name)->exists() ? $printer_name : $this->printer_name;
        $props['printer_name'] = $printer_name;
        return parent::print($props);
    }

}
