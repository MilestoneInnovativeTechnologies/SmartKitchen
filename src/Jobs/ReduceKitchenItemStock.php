<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Events\KitchenStockReduced;
use Milestone\SmartKitchen\Events\KitchenStockReducing;
use Milestone\SmartKitchen\Models\KitchenItem;

class ReduceKitchenItemStock
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $kitchen, $item, $quantity;

    public function __construct($kitchen, $item, $quantity){
        $this->kitchen = $kitchen;
        $this->item = $item;
        $this->quantity = $quantity;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(){
        $kitchen = $this->kitchen;
        $item = $this->item;
        $quantity = $this->quantity;
        KitchenStockReducing::dispatch($kitchen,$item,$quantity);
        $updates = KitchenItem::where(compact('kitchen','item'))->decrement('stock',$quantity);
        Log::info('Updated kitchen stock of ' . $updates . ' items.. Item ID: ' . $item);
        KitchenStockReduced::dispatch($kitchen,$item,$quantity);
    }
}
