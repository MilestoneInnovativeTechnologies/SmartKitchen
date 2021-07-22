<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Events\KitchenItemSaved;
use Milestone\SmartKitchen\Jobs\RemoteAddKitchenItem;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenItem;

class CheckAndProcessRemoteKitchenItemAdd
{
    public function __construct()
    {
        //
    }
    public function handle(KitchenItemSaved $event)
    {
        if(Arr::get(Kitchen::find(Arr::get(KitchenItem::find($event->ki),'kitchen')),'cloud') !== 'Yes') return;
        $location = request()->input('_location') ?: null;
        RemoteAddKitchenItem::dispatch($event->ki,$location);
    }
}
