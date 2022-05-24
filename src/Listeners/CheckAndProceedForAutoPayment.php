<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\AutoPayment;

class CheckAndProceedForAutoPayment
{

    public function __construct()
    {
        //
    }

    public function handle($event)
    {
        $bill_id = $event->bill_id; $user_id = $event->user_id;
        AutoPayment::dispatch($bill_id,$user_id);
    }

}
