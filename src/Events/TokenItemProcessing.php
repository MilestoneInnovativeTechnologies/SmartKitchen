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

class TokenItemProcessing
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tokenItem, $kitchen, $item, $token, $user;

    public function __construct(TokenItem $tokenItem, $user)
    {
        $this->tokenItem = $tokenItem->id;
        $this->kitchen = $tokenItem->kitchen;
        $this->item = $tokenItem->item;
        $this->token = $tokenItem->token;
        $this->user = $user;
    }

}
