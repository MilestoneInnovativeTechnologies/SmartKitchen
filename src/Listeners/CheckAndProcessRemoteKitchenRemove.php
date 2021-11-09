<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\KitchenSaved;
use Milestone\SmartKitchen\Jobs\RemoteRemoveKitchen;
use Milestone\SmartKitchen\Jobs\RemoteRemoveKitchenItems;

class CheckAndProcessRemoteKitchenRemove
{
    public function __construct()
    {
        //
    }
    public function handle(KitchenSaved $event)
    {
        $kitchen = $event->kitchen;
        if($kitchen->cloud === 'No' && $kitchen->wasChanged('cloud')) {
            $location = request()->input('_location') ?: null;
            RemoteRemoveKitchen::dispatch($kitchen->id,$location);
            RemoteRemoveKitchenItems::dispatch($kitchen->id,$location);
        }
    }
}
