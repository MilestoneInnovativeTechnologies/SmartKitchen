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

class TokenItemProcessed
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tokenItem, $kitchen, $item, $token, $token_id, $user;

    public function __construct(TokenItem $tokenItem, $user)
    {
        $this->tokenItem = $tokenItem->id;
        $this->kitchen = $tokenItem->kitchen;
        $this->item = $tokenItem->item;
        $this->token = $tokenItem->token;
        $this->token_id = is_object($tokenItem->token) ? $tokenItem->token->id : $tokenItem->token;
        $this->user = $user;
    }

}
