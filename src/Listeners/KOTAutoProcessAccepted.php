<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\TokenItemAccepted;
use Milestone\SmartKitchen\Jobs\AutoProcessAcceptedOrder;

class KOTAutoProcessAccepted
{
    public function __construct()
    {
        //
    }
    public function handle(TokenItemAccepted $event)
    {
        if(!config('sk.settings.kot.auto_process_on_accepting')) return;
        AutoProcessAcceptedOrder::dispatch($event->tokenItem, $event->kitchen, $event->user)->afterResponse();
    }
}
