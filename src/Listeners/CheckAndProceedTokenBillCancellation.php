<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Controllers\BillController;
use Milestone\SmartKitchen\Jobs\TryMakingBillAsCancelled;
use Milestone\SmartKitchen\Models\Bill;

class CheckAndProceedTokenBillCancellation
{
    public function __construct()
    {
        //
    }
    public function handle($event)
    {
        $token_id = $event->token;
        if(settings('avoid_cancelling_bill_on_token_update',true) !== true){
            if(Bill::where('token',$token_id)->where('progress','!=','Cancelled')->exists()){
                $bill = Bill::where('token',$token_id)->where('progress','!=','Cancelled')->first();
                if($bill->progress === 'Pending') TryMakingBillAsCancelled::dispatch($bill->id);
                elseif(settings('restrict_payment_cancel_while_bill_cancel_on_token_update',true) !== true) {
                    BillController::CancelPayments($bill->id);
                    TryMakingBillAsCancelled::dispatch($bill->id);
                } else {
                    Log::info('Bill have payments and settings wont allow to cancel payments!');
                }
            }
        }
    }
}
