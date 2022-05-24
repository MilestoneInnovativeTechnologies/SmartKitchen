<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Controllers\PaymentController;
use Milestone\SmartKitchen\Models\Bill;

class AutoPayment // implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $bill, $user;

    public function __construct($bill_id, $user_id)
    {
        $this->bill = Bill::with(['Token','Payments'])->find($bill_id);
        $this->user = $user_id;
    }

    public function handle()
    {
        $Payments = Arr::get($this->bill,'Payments'); if($Payments->isNotEmpty()) return null;
        $type = self::SettingsAutoPay($this->bill->Token->type);
        if(!$type) return false;
        $bill = $this->bill->id; $amount = self::Amount($this->bill); $detail = 'Auto Pay';
        request()->merge(compact('bill','amount','type','detail'));
        $class = PaymentController::class; $action = "create";
        $call = "$class@$action";
        return app()->call($call);
    }

    private static function SettingsAutoPay($type){
        $s1 = settings(Str::snake("auto pay $type bill payment type"));
        $s2 = settings(Str::snake("auto pay bill payment type"));
        if($s1 === null && $s2 === null) return false;
        return ($s1 !== null) ? $s1 : $s2;
    }

    private static function Amount($bill){
        $amount = floatval(Arr::get($bill,'amount'));
        $discount = floatval(Arr::get($bill,'discount'));
        $round = floatval(Arr::get($bill,'round'));
        return $amount - $discount - $round;
    }

}
