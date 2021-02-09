<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Events\TokenItemAccepted;
use Milestone\SmartKitchen\Jobs\AutoProcessAcceptedOrder;
use Milestone\SmartKitchen\Models\KitchenItem;

class KOTAutoProcessAccepted
{
    public function __construct()
    {
        //
    }
    public function handle(TokenItemAccepted $event)
    {
        $kitchen = $event->kitchen; $item = $event->item;
        $auto_process = Arr::get(KitchenItem::where(compact('kitchen','item'))->first(),'auto_process','No');
        if($auto_process === 'Yes') AutoProcessAcceptedOrder::dispatch($event->tokenItem, $kitchen, $event->user);//->afterResponse();
    }
}
