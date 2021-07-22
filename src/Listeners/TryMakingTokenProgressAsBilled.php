<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\BillCreated;
use Milestone\SmartKitchen\Events\TokenProgressMadeAsBilled;
use Milestone\SmartKitchen\Jobs\MakeTokenProgressAsBilled;

class TryMakingTokenProgressAsBilled
{
    public function __construct()
    {
        //
    }

    public function handle(BillCreated $event)
    {
        return MakeTokenProgressAsBilled::dispatch($event->bill->token);
    }
}
