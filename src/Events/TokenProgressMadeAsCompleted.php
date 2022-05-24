<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class TokenProgressMadeAsCompleted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $token_id, $user;

    public function __construct($token)
    {
        $this->token_id = $token->id;
        $this->user = Auth::id();
    }

}
