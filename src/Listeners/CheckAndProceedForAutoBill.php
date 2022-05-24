<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\AutoBillCompletedOrder;

class CheckAndProceedForAutoBill
{

    public function __construct()
    {
        //
    }

    public function handle($event)
    {
        $token_id = $event->token_id; $user_id = $event->user;
        AutoBillCompletedOrder::dispatch($token_id,$user_id);
    }

}
