<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Carbon;
use Milestone\SmartKitchen\Scopes\ActiveOnlyScope;

class Payment extends Model
{
    protected static function booted(){ static::addGlobalScope(new ActiveOnlyScope); }

    public function Bill(){ return $this->belongsTo(Bill::class,'bill','id'); }

    public $printer_name = 'payment_printer';
    public $print_template = 'payment_print_template';

    public function scopeRecent($Q){
        return $Q->where('created_at','>=',now()->subDays(Token::$recentDays)->startOfDay()->toDateTimeString());
    }
    public static function fetch($after,$before,$lid){
        return self::recent()->sync($after,$before,$lid)->get();
    }

    public function print_data($data){
        $bill = (new Bill)->print_data(Bill::with(['Payments'])->find($data->bill));
        foreach ($bill['payments'] as $pKey => $payment){
            $bill['payments'][$pKey]['date_time'] = Carbon::parse($payment['date'])->format('d/m h:i A');
            $bill['payments'][$pKey]['amount_precise'] = precise($payment['amount']);
        }
        $bill['paid_precise'] = precise(array_sum(array_column($bill['payments'],'amount')));
        return $bill;
    }
}
