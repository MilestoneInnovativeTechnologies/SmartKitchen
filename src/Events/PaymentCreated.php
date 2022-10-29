<?php

namespace Milestone\SmartKitchen\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Payment;

class PaymentCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $payment, $bill, $token_id;
    public $item = 'payment', $happened = 'created';

    public function __construct(Payment $payment)
    {
        $this->payment = $payment->load('Bill');
        $this->bill = $payment->Bill;
        $this->token_id = is_object($payment->Bill->token) ? $payment->Bill->token->id : $payment->Bill->token;
    }

}
