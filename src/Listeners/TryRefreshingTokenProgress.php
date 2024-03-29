<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\RefreshTokenProgress;

class TryRefreshingTokenProgress
{
    public function __construct()
    {
        //
    }
    public function handle($event)
    {
        if($event->token_id) RefreshTokenProgress::dispatch($event->token_id);
    }
}
