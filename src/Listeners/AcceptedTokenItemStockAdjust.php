<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\TokenItemReset;

class AcceptedTokenItemStockAdjust
{
    public function __construct()
    {
        //
    }
    public function handle($event)
    {
        if($event->old['progress'] !== 'Accepted' || !$event->kitchen) return;
        $old = intval($event->old['quantity']); $new = intval($event->new['quantity']);
        if($old === $new) return;
        $kitchen = $event->kitchen; $item = $event->item;
        Log::info('Accepted token have quantity change.. Stock adjusting.. Token: ' . $event->old['quantity'] . ', Kitchen: ' . $kitchen . ', Item: ' . $item);
        if($new > $old) \Milestone\SmartKitchen\Jobs\ReduceKitchenItemStock::dispatch($kitchen,$item,$new - $old);
        else \Milestone\SmartKitchen\Jobs\IncrementKitchenItemStock::dispatch($kitchen,$item,$old - $new);
    }
}
