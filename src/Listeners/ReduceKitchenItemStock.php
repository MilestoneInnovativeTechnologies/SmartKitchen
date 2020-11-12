<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\TokenItemAccepted;

class ReduceKitchenItemStock
{
    public function __construct()
    {
        //
    }
    public function handle(TokenItemAccepted $event)
    {
        $kitchen = $event->kitchen; $item = $event->item; $quantity = $event->quantity;
        \Milestone\SmartKitchen\Jobs\ReduceKitchenItemStock::dispatch($kitchen,$item,$quantity);
    }
}
