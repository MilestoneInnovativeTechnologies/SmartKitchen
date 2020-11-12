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

    public $tokenItem, $kitchen, $item, $quantity, $user;

    public function __construct($tokenItem,$user)
    {
        $this->tokenItem = $tokenItem->id;
        $this->kitchen = $tokenItem->kitchen;
        $this->item = $tokenItem->item;
        $this->quantity = $tokenItem->quantity;
        $this->user = $user;
    }

}
