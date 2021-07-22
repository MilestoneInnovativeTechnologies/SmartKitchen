<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Events\KitchenItemDeleted;
use Milestone\SmartKitchen\Jobs\RemoteDeleteKitchenItem;
use Milestone\SmartKitchen\Models\Remote;

class CheckAndProcessRemoteKitchenItemDelete
{
    public function __construct()
    {
        //
    }
    public function handle(KitchenItemDeleted $event)
    {
        if(!Remote::where(['item' => 'kitchen_items', 'local_id' => $event->ki])->exists()) return;
        RemoteDeleteKitchenItem::dispatch($event->ki);
    }
}
