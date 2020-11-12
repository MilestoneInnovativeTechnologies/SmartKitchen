<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class KitchenStockIncremented
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $kitchen, $item, $quantity;

    public function __construct($kitchen, $item, $quantity) {
        $this->kitchen = $kitchen;
        $this->item = $item;
        $this->quantity = $quantity;
    }

}
