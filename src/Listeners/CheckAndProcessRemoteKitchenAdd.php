<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\KitchenSaved;
use Milestone\SmartKitchen\Jobs\RemoteAddKitchen;
use Milestone\SmartKitchen\Jobs\RemoteAddKitchenItems;

class CheckAndProcessRemoteKitchenAdd
{
    public function __construct()
    {
        //
    }
    public function handle(KitchenSaved $event)
    {
        $kitchen = $event->kitchen;
        if($kitchen->cloud === 'Yes' || $kitchen->wasChanged('cloud')) {
            $location = request()->input('_location') ?: null;
            RemoteAddKitchen::dispatch($kitchen->id,$location);
            RemoteAddKitchenItems::dispatch($kitchen->id,$location);
        }
    }
}
