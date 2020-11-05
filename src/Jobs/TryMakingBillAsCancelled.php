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
        if($this->bill->Payments->isNotEmpty()){
            Log::warning('This bill have payments in active state. Process Terminating!!');
        } $this->run();
    }

    private function run(){
        BillProgressMakingAsCancelled::dispatch($this->bill);
        $this->bill->update(['progress' => 'Cancelled']);
        Log::info('Bill progress made to Cancelled!!');
        BillProgressMadeAsCancelled::dispatch($this->bill->fresh());
    }
}
