<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Models\Bill;

class BillCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $bill, $bill_id, $token_id, $user_id;

    public function __construct(Bill $bill)
    {
        $this->bill = $bill;
        $this->bill_id = $bill->id;
        $this->token_id = $bill->token;
        $this->user_id = Arr::get($bill,'user',Auth::id());
    }

}
