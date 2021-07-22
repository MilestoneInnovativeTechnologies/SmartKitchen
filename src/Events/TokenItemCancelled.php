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

class TokenItemCancelled
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $token, $tokenItem, $user;

    public function __construct(TokenItem $tokenItem, $user)
    {
        $this->tokenItem = $tokenItem->id;
        $this->token = $tokenItem->token;
        $this->user = $user;
    }

}
