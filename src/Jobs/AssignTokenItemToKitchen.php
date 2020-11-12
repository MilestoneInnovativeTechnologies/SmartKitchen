<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Controllers\TokenController;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\TokenItem;

class AssignTokenItemToKitchen
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tokenItem, $user;

    public function __construct($tokenItem, $user){
        $this->tokenItem = $tokenItem;
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle() {
        $tokenItem = TokenItem::find($this->tokenItem); $item_id = $tokenItem->item; $stock = config('sk.consider_stock') ? 0 : -9999999;
        $query = Kitchen::has('Active')->whereHas('Items',function($iQ) use($item_id,$stock){ return $iQ->where('item',$item_id)->where('stock','>',$stock); });
        if($query->exists()){
            $kitchens = $query->get();
            $auto_accept_kitchen = $kitchens->firstWhere('auto_accept','Yes');
            if($auto_accept_kitchen) {
                Log::info('Item: ' . $item_id . ', is auto accepted at kitchen: ' . $auto_accept_kitchen->id . '. Doing auto accepting..');
                return TokenController::TokenItemAccept($this->tokenItem,$auto_accept_kitchen->id,Auth::id());
            }
        }
    }
}
