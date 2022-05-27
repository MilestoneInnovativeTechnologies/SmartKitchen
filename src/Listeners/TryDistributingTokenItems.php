<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\AssignTokenItemToKitchen;

class TryDistributingTokenItems
{
    public function __construct()
    {
        //
    }
    public function handle($event)
    {
        $tokenItems = $event->tokenItems; $user = $event->user;
        collect($tokenItems)->each(function($tokenItem) use($user){
            if(!$tokenItem->kitchen || $tokenItem->progress === 'New')
                AssignTokenItemToKitchen::dispatch($tokenItem->id,$user);
        });
    }
}
