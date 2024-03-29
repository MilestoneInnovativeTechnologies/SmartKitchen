<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Token;

class TokenItemAdded
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $token, $user, $tokenItem, $tokenItemID, $mode = 'Add';

    public function __construct($tokenItem, $user)
    {
        $this->token = $tokenItem->token;
        $this->user = $user;
        $this->tokenItem = $tokenItem;
        $this->tokenItemID = $tokenItem->id;
    }

}
