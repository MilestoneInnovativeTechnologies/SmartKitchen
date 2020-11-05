<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TokenCustomerSetting
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $token_id, $customer_id;

    public function __construct($token, $customer)
    {
        $this->token_id = $token;
        $this->customer_id = $customer;
    }

}
