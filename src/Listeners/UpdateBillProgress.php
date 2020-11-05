<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\PaymentCreated;

class UpdateBillProgress
{
    public function __construct()
    {
        //
    }
    public function handle(PaymentCreated $event)
    {
        $bill = $event->bill->id;
        \Milestone\SmartKitchen\Jobs\UpdateBillProgress::dispatch($bill);
    }
}
