<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Controllers\PaymentController;
use Milestone\SmartKitchen\Events\BillCreated;

class CheckForAdvancePayments
{
    public function __construct()
    {
        //
    }

    public function handle(BillCreated $event) {
        \request()->whenFilled(['advance_type','advance_amount'],function() use($event){
            if(intval(request()->input('advance_amount')) > 0){
                request()->merge([
                    'type' => request()->input('advance_type'),
                    'amount' => request()->input('advance_amount'),
                    'bill' => $event->bill->id,
                ]);
                app()->call(PaymentController::class,[],'create');
            }
        });
    }
}
