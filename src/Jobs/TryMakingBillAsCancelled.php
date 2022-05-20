<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Events\BillProgressMadeAsCancelled;
use Milestone\SmartKitchen\Events\BillProgressMakingAsCancelled;
use Milestone\SmartKitchen\Models\Bill;
use Milestone\SmartKitchen\Models\Payment;
use Milestone\SmartKitchen\Models\Token;

class TryMakingBillAsCancelled
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $bill;

    public function __construct($bill)
    {
        $this->bill = Bill::with(['Payments'])->find($bill);
    }

    public function handle()
    {
        Log::info('Initialized Bill Cancel Activity');
        if($this->bill->Payments->isEmpty()) return $this->run();
        Log::warning('The bill: ' . $this->bill->id . ' have payments in active state..');
        Log::info('Checking for token existence!!');
        if(Token::where('id',$this->bill->token)->where('progress','!=','Cancelled')->exists()) return Log::info('Token exists and Payments made.. Bill cannot cancel.. Terminating!!');
        Log::warning('Token not exists. Cancelling all payments..');
        Payment::where('bill',$this->bill->id)->update(['status' => 'Inactive']);
        $this->run();
    }

    private function run(){
        BillProgressMakingAsCancelled::dispatch($this->bill);
        $this->bill->update(['progress' => 'Cancelled']);
        Log::info('Bill progress made to Cancelled!!');
        BillProgressMadeAsCancelled::dispatch($this->bill->fresh());
    }
}
