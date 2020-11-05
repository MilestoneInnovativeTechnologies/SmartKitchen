<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\TokenItem;

class TokenItemReset
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tokenItem, $kitchen;

    public function __construct(TokenItem $tokenItem, $kitchen)
    {
        $this->tokenItem = $tokenItem;
        $this->kitchen = $kitchen;
    }

}
