<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class KitchenItemDeleted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $ki, $kitchen, $item;

    public function __construct($ki,$kitchen,$item) {
        $this->ki = $ki->id;
        $this->kitchen = $kitchen;
        $this->item = $item;
    }

}
