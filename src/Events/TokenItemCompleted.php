<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\TokenItem;

class TokenItemCompleted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tokenItemID, $token, $user;

    public function __construct($tokenItem, $user)
    {
        $this->tokenItemID = $tokenItem->id;
        $this->token = $tokenItem->token;
        $this->user = $user;
    }

}
