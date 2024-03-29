<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\RefreshTokenProgress;

class TryResettingTokenProgress
{
    public function __construct()
    {
        //
    }
    public function handle($event)
    {
        RefreshTokenProgress::dispatch($event->token);
    }
}
