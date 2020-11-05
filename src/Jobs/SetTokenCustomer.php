<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Events\TokenCustomerSet;
use Milestone\SmartKitchen\Events\TokenCustomerSetting;
use Milestone\SmartKitchen\Models\Customer;
use Milestone\SmartKitchen\Models\Token;

class SetTokenCustomer
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $token, $customer;

    public function __construct($token, $customer)
    {
        $this->token = Token::find($token);
        $this->customer = Customer::find($customer);
    }

    public function handle()
    {
        Log::info('Initialized Set Token Customer Activity');
        $cCustomer = $this->token->customer;
        if($cCustomer && $this->customer->id === $cCustomer){
            Log::info('Token have assigned to same customer: ' . $this->customer->name);
        } else if($cCustomer) {
            Log::warning('Changing token customer from : ' . $cCustomer . ' -> ' . $this->customer->id . '(' . $this->customer->name . ')');
            $this->run();
        } else {
            Log::info('Setting token customer: ' . $this->customer->id . '(' . $this->customer->name . ')');
            $this->run();
        }
    }

    private function run(){
        TokenCustomerSetting::dispatch($this->token->id,$this->customer->id);
        $this->token->update(['customer' => $this->customer->id]);
        Log::info('Token Customer sets!!');
        TokenCustomerSet::dispatch($this->token->fresh(),$this->customer);
    }
}
