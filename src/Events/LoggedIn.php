<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\User;

class LoggedIn
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user, $in, $section;

    public function __construct(User $user, $section)
    {
        $this->user = $user;
        $this->in = time();
        $this->section = $section;
    }

}
