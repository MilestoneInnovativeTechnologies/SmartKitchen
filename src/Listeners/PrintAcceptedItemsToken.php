<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\PrintOrderKot;

class PrintAcceptedItemsToken
{
    public function __construct()
    {
        //
    }
    public function handle($event)
    {
        PrintOrderKot::dispatch($event->token,$event->mode,$event->added,$event->modified,$event->cancelled);
    }
}
