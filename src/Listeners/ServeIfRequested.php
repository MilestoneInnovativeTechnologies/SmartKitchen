<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\ServeAllTokenItems;

class ServeIfRequested
{

    public function __construct()
    {
        //
    }

    public function handle($event)
    {
        if(request()->filled('serve') && request()->input('serve')){
            ServeAllTokenItems::dispatch($event->token,$event->user);
        }
    }
}
