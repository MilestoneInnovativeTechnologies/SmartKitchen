<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Bill;

class BillProgressMadeAsPending
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $bill,$token;

    public function __construct(Bill $bill)
    {
        $bill->load(['Token']);
        $this->bill = $bill;
        $this->token = $bill->Token;
    }

}
