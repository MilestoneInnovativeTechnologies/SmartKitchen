<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class Subscribers
{

    public function subscribe()
    {
        return [
            \Milestone\SmartKitchen\Events\LoggedIn::class      =>  [
                LoggedIn::class,
                CacheInit::class
            ],
            \Milestone\SmartKitchen\Events\LoggingOut::class    =>  [],
            \Milestone\SmartKitchen\Events\LoggedOut::class     =>  [
                LoggedOut::class
            ],

            \Milestone\SmartKitchen\Events\TokenCreating::class =>  [],
            \Milestone\SmartKitchen\Events\TokenCreated::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemPrepared::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemsSaving::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemsSaved::class =>  [
                TryDistributingTokenItems::class
            ],
            \Milestone\SmartKitchen\Events\TokenItemAccepting::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemAccepted::class =>  [
                KOTAutoProcessAccepted::class,
                ReduceKitchenItemStock::class
            ],
            \Milestone\SmartKitchen\Events\TokenItemResetting::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemReset::class =>  [
                TryResettingTokenProgress::class,
                IncrementKitchenItemStock::class
            ],
            \Milestone\SmartKitchen\Events\TokenItemProcessing::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemProcessed::class =>  [
                TryMakingTokenProgressAsProcessing::class
            ],
            \Milestone\SmartKitchen\Events\TokenItemCompleting::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemCompleted::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemServing::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemServed::class =>  [
                TryMakingTokenProgressAsCompleted::class
            ],
            \Milestone\SmartKitchen\Events\TokenItemCancelling::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemCancelled::class =>  [
                TryResettingTokenProgress::class
            ],
            \Milestone\SmartKitchen\Events\TokenItemAdding::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemAdded::class =>  [
                TryRefreshingTokenProgress::class,
            ],
            \Milestone\SmartKitchen\Events\TokenProgressMakingAsProcessing::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMadeAsProcessing::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMakingAsNew::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMadeAsNew::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMakingAsCompleted::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMadeAsCompleted::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMakingAsBilled::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMadeAsBilled::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMakingAsCancelled::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMadeAsCancelled::class =>  [],

            \Milestone\SmartKitchen\Events\TokenCustomerSetting::class =>  [],
            \Milestone\SmartKitchen\Events\TokenCustomerSet::class =>  [],

            \Milestone\SmartKitchen\Events\BillCreating::class =>  [
                SetTokenCustomer::class
            ],
            \Milestone\SmartKitchen\Events\BillCreated::class =>  [
                TryMakingTokenProgressAsBilled::class
            ],
            \Milestone\SmartKitchen\Events\BillProgressMakingAsCancelled::class => [],
            \Milestone\SmartKitchen\Events\BillProgressMadeAsCancelled::class => [
                TryRefreshingTokenProgress::class
            ],
            \Milestone\SmartKitchen\Events\BillProgressMakingAsPending::class => [],
            \Milestone\SmartKitchen\Events\BillProgressMadeAsPending::class => [],
            \Milestone\SmartKitchen\Events\BillProgressMakingAsPartial::class => [],
            \Milestone\SmartKitchen\Events\BillProgressMadeAsPartial::class => [],
            \Milestone\SmartKitchen\Events\BillProgressMakingAsPaid::class => [],
            \Milestone\SmartKitchen\Events\BillProgressMadeAsPaid::class => [],

            \Milestone\SmartKitchen\Events\PaymentCreating::class =>  [],
            \Milestone\SmartKitchen\Events\PaymentCreated::class =>  [
                UpdateBillProgress::class
            ],

            \Milestone\SmartKitchen\Events\KitchenStockReducing::class =>  [],
            \Milestone\SmartKitchen\Events\KitchenStockReduced::class =>  [],
            \Milestone\SmartKitchen\Events\KitchenStockIncrementing::class =>  [],
            \Milestone\SmartKitchen\Events\KitchenStockIncremented::class =>  [],

        ];
    }
}
