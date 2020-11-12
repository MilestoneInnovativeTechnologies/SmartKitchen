<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\TokenItemReset;

class IncrementKitchenItemStock
{
    public function __construct()
    {
        //
    }
    public function handle(TokenItemReset $event)
    {
        $kitchen = $event->kitchen; $item = $event->item; $quantity = $event->quantity;
        \Milestone\SmartKitchen\Jobs\IncrementKitchenItemStock::dispatch($kitchen,$item,$quantity);
    }
}
