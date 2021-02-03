<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class KitchenStatusCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $kitchen, $users;

    public function __construct($kitchen, $users)
    {
        $this->kitchen = $kitchen;
        $this->users = is_array($users) ? array_map('intval',$users) : [intval($users)];
    }

}
