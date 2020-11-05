<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\BillCreating;

class SetTokenCustomer
{
    public function __construct()
    {
        //
    }

    public function handle(BillCreating $event)
    {
        $customer = $event->data['customer'];
        $token = $event->data['token'];
        \Milestone\SmartKitchen\Jobs\SetTokenCustomer::dispatch($token,$customer);
    }
}
