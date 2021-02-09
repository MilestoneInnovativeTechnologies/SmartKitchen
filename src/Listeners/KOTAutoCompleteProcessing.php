<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Events\TokenItemProcessed;
use Milestone\SmartKitchen\Jobs\AutoCompleteProcessingOrder;
use Milestone\SmartKitchen\Models\KitchenItem;

class KOTAutoCompleteProcessing
{
    public function __construct()
    {
        //
    }
    public function handle(TokenItemProcessed $event)
    {
        $kitchen = $event->kitchen; $item = $event->item;
        $auto_complete = Arr::get(KitchenItem::where(compact('kitchen','item'))->first(),'auto_complete','No');
        if($auto_complete === 'Yes') AutoCompleteProcessingOrder::dispatch($event->tokenItem, $kitchen, $event->user);//->afterResponse();
    }
}
