<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BillProgressMadeAsCancelled
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $bill_id,$token_id;

    public function __construct($bill)
    {
        $this->bill_id = $bill->id;
        $this->token_id = $bill->token;
    }

}
