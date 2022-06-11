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
        $request_segments = array_slice(request()->segments(),-2);
        if(in_array('payment',$request_segments) && in_array('cancel',$request_segments)) return ;
        AutoPayment::dispatch($bill_id,$user_id);
    }

}
