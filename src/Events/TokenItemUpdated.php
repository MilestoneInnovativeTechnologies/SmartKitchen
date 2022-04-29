<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TokenItemUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $token, $tokenItemID, $kitchen, $item, $old, $new, $mode = 'Modify';

    public function __construct($id,$newData,$oldData)
    {
        $this->tokenItemID = $id;
        $this->kitchen = $oldData['kitchen'] ?? null;
        $this->item = $oldData['item'] ?? null;
        $this->old = $oldData;
        $this->new = $newData;
        $this->token = $oldData['token'] ?? null;
    }

}
