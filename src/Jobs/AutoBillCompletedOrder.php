<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Controllers\BillController;
use Milestone\SmartKitchen\Models\Customer;
use Milestone\SmartKitchen\Models\Token;

class AutoBillCompletedOrder // implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $token, $user;

    public function __construct($token_id, $user_id)
    {
        $this->token = Token::with('Bill')->find($token_id);
        $this->user = $user_id;
    }

    public function handle()
    {
        if(Arr::exists($this->token,'Bill')) return null;
        if(!self::SettingsAutoBill($this->token->type)) return false;
        $customer = self::AutoBillCustomer($this->token); if(!$customer) return Log::info("Auto Billing without customer.. Terminating! Token ID: " . $this->token->id);
        $token = $this->token->id; $user = $this->user; $nature = self::AutoBillTax($this->token->type);
        $class = BillController::class; $action = 'create';
        Log::info("Auto Billing Completed Token. Token ID: $token");
        request()->merge(compact('token','customer','nature','user'));
        $call = "$class@$action";
        return app()->call($call);
    }

    private static function AutoBillCustomer($token){
        if($token->customer) return $token->customer;
        return self::SettingsDefaultCustomer($token->type);
    }

    private static function SettingsAutoBill($type){
        $s1 = settings(Str::snake("Auto bill $type token on complete"),true);
        $s2 = settings(Str::snake("Auto bill token on complete"),true);
        if($s1 === null && $s2 === null) return false;
        return ($s1 !== null) ? $s1 : $s2;
    }

    private static function SettingsDefaultCustomer($type){
        $s1 = settings(Str::snake("$type default customer"));
        $s2 = settings(Str::snake("default customer"));
        if($s1 === null && $s2 === null) return false;
        return Arr::get(Customer::where('name',($s1 !== null) ? $s1 : $s2)->first(),"id",false);
    }

    private static function AutoBillTax($type){
        $s1 = settings(Str::snake("Auto bill $type default tax nature"));
        $s2 = settings(Str::snake("Auto bill default tax nature"));
        if($s1 === null && $s2 === null) return null;
        return ($s1 !== null) ? $s1 : $s2;
    }
}
