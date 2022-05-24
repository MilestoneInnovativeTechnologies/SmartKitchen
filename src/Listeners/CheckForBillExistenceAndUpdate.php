<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Events\TokenProgressMadeAsCompleted;
use Milestone\SmartKitchen\Jobs\MakeTokenProgressAsBilled;
use Milestone\SmartKitchen\Models\Bill;

class CheckForBillExistenceAndUpdate
{

    public function __construct()
    {
        //
    }

    public function handle(TokenProgressMadeAsCompleted $event)
    {
        $token_id = $event->token_id;
        if(Bill::where('progress','!=','Cancelled')->where('token',$token_id)->exists())
            MakeTokenProgressAsBilled::dispatch($token_id);
    }
}
