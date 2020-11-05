<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TokenItemsSaved
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tokenItem;

    public function __construct($tokenItem)
    {
        $this->tokenItem = $tokenItem;
    }

}
