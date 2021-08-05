<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\TokenItemServed;
use Milestone\SmartKitchen\Jobs\RefreshTokenProgress;
use Milestone\SmartKitchen\Models\TokenItem;

class TryMakingTokenProgressAsCompleted
{
    public function __construct()
    {
        //
    }
    public function handle(TokenItemServed $event)
    {
        $tokenItem = $event->tokenItem;
        $token = $tokenItem->token;
        if(TokenItem::where('token',$token)->whereNotIn('progress',['Served','Cancelled'])->exists())
            return Log::info('Have few more token items in pending for token: ' . $token);
        return RefreshTokenProgress::dispatch($token);
    }
}
