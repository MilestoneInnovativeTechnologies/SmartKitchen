<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\ResetTokenProgress;

class TryResettingTokenProgress
{
    public function __construct()
    {
        //
    }
    public function handle($event)
    {
        $token = $event->tokenItem->Token; $progress = $token->progress;
        if($progress === 'New') return Log::warning('Trying token reset. Token already in New progress!! Terminating');
        return  ResetTokenProgress::dispatch($token)->afterResponse();
    }
}
