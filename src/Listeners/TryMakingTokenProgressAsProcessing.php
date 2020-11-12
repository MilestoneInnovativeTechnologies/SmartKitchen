<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\TokenItemProcessed;
use Milestone\SmartKitchen\Jobs\MakeTokenProgressProcessing;
use Milestone\SmartKitchen\Models\TokenItem;

class TryMakingTokenProgressAsProcessing
{
    public function __construct()
    {
        //
    }
    public function handle(TokenItemProcessed $event)
    {
        $tokenItem = TokenItem::with('Token')->find($event->tokenItem);
        $token = $tokenItem->Token;
        if($token->progress === 'Processing') return Log::info('Token already in Processing!!');
        return  MakeTokenProgressProcessing::dispatch($token->id);
    }
}
