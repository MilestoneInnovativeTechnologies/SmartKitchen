<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TokenItemAdding
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $token, $item, $quantity, $user, $data;

    public function __construct($token, $item, $quantity, $user, $data)
    {
        $this->token = $token;
        $this->item = $item;
        $this->quantity = $quantity;
        $this->user = $user;
        $this->data = $data;
    }

}
