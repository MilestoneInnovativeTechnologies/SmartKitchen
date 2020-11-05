<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Bill;

class UpdateBillProgress
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $bill;

    public function __construct($bill)
    {
        $this->bill = Bill::with(['Payments'])->find($bill);
    }

    public function handle()
    {
        Log::info('Initialized Bill Progress Refresh Activity');
        $payments = $this->bill->Payments; $payable = $this->payable(); $paid = $this->paid();
        if($payments->isEmpty()){
            Log::info('No Payments. Bill progress marked as Pending');
            $this->makeProgress('Pending');
        } elseif($paid < $payable) {
            Log::info("Partial Payment.. Payable: $payable, Paid: " . $this->paid());
            $this->makeProgress('Partial');
        } else {
            if($paid > $payable)
                Log::warning("More Paid.. Payable: $payable, Paid: " . $this->paid());
            $this->makeProgress('Paid');
        }
    }

    private function paid(){
        $payments = $this->bill->Payments;
        if($payments->isEmpty()) return doubleval(0);
        return $payments->sum(function($payment){ return doubleval($payment->amount ?: 0); });
    }

    private function payable(){
        $amount = $this->bill->amount; $discount = $this->bill->discount;
        return doubleval($amount) - doubleval($discount);
    }

    private function makeProgress($progress){
        $class = Str::of('\Milestone\SmartKitchen\Events\BillProgressMakingAs')->append($progress)->__toString();
        $class::dispatch($this->bill);
        $this->bill->update(['progress' => $progress]);
        Log::info('Bill progress made to ' .$progress. '!!');
        $class = Str::of('\Milestone\SmartKitchen\Events\BillProgressMadeAs')->append($progress)->__toString();
        $class::dispatch($this->bill);
    }
}
