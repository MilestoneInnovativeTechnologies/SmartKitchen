<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\TokenItemAdded;
use Milestone\SmartKitchen\Jobs\AssignTokenItemToKitchen;

class TryDistributingAddedTokenItem
{
    public function __construct()
    {
        //
    }
    public function handle(TokenItemAdded $event)
    {
        $tokenItem = $event->tokenItem; $user = $event->user;
        if(!$tokenItem->kitchen || $tokenItem->progress === 'New')
            AssignTokenItemToKitchen::dispatch($tokenItem->id,$user);
    }
}
