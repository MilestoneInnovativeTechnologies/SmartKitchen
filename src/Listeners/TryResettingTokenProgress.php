<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\ResetTokenProgress;
use Milestone\SmartKitchen\Models\TokenItem;

class TryResettingTokenProgress
{
    public function __construct()
    {
        //
    }
    public function handle($event)
    {
        $token = TokenItem::with(['Token'])->find($event->tokenItem);
        if(!$token) return;
        $token = $token->Token; $progress = $token->progress;
        if($progress === 'New') return Log::warning('Trying token reset. Token already in New progress!! Terminating');
        return  ResetTokenProgress::dispatch($token->id)->afterResponse();
    }
}
