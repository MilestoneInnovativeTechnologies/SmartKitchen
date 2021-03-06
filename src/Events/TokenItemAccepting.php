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
use Milestone\SmartKitchen\Models\User;

class TokenItemAccepting
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tokenItem, $kitchen, $user;

    public function __construct($tokenItem, $kitchen, $user)
    {
        $this->tokenItem = $tokenItem;
        $this->kitchen = $kitchen;
        $this->user = $user;
    }

}
