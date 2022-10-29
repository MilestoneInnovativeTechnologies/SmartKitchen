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

class TokenUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $token, $token_id, $item = 'token', $happened = 'updated', $action = null;

    public function __construct(Token $token,$action = null)
    {
        $this->token = $token;
        $this->token_id = $token->id;
        $this->action = $action;
    }

}
