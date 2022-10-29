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

class BillUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $item = 'bill', $happened = 'updated', $token_id;

    public function __construct(Bill $bill)
    {
        $this->token_id = is_object($bill->token) ? $bill->token->id : $bill->token;
    }

}
