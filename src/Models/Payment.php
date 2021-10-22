<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Scopes\ActiveOnlyScope;

class Payment extends Model
{
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
        $role = $name = ''; $Token = new Token();
        if(auth()->user()){ $user = auth()->user(); $role = $user->role; $name = $user->name; }
        if(!Arr::hasAny($props,['printer','printer_name'])) $props['printer_name'] = $Token->print_name_item('Printer',$role,'Payment','',$name);
        if(!Arr::hasAny($props,['template','template_name'])) $props['template_name'] = $Token->print_name_item('Print Template',$role,'Payment','',$name);
        return parent::print($props);
    }

}
