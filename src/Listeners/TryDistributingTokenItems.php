<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\TokenItemsSaved;
use Milestone\SmartKitchen\Jobs\AssignTokenItemToKitchen;

class TryDistributingTokenItems
{
    public function __construct()
    {
        //
    }
    public function handle(TokenItemsSaved $event)
    {
        $tokenItems = $event->tokenItems; $user = $event->user;
        $tokenItems->each(function($tokenItem) use($user){
            AssignTokenItemToKitchen::dispatch($tokenItem->id,$user);
        });
    }
}
