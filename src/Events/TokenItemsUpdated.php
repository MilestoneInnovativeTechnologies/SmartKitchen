<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TokenItemsUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tokenItems, $added, $modified, $cancelled, $user, $token, $mode = 'Updated';

    public function __construct($added, $modified, $cancelled, $user, $token)
    {
        $this->added = $added; $this->modified = $modified; $this->cancelled = $cancelled;
        $this->tokenItems = $added + $modified + $cancelled;
        $this->user = $user; $this->token = $token;
    }

}
