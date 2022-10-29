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
            \Milestone\SmartKitchen\Events\TokenCreated::class =>  [
                CheckAndProceedForSMS::class
            ],
            \Milestone\SmartKitchen\Events\TokenItemPrepared::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemsSaving::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemsSaved::class =>  [
                TryDistributingTokenItems::class,
                PrintAcceptedItemsToken::class,
                CheckAndDoFurtherIfRemoteOrder::class,
                CheckAndDoFurtherIfHavePayment::class,
                ServeIfRequested::class,
            ],
            \Milestone\SmartKitchen\Events\TokenItemsCancelled::class => [],
            \Milestone\SmartKitchen\Events\TokenItemsAdded::class => [],
            \Milestone\SmartKitchen\Events\TokenItemsUpdated::class => [
                PrintAcceptedItemsToken::class,
                CheckAndProceedTokenBillCancellation::class,
                TryResettingTokenProgress::class,
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
                TryRefreshingTokenProgress::class,
                KOTAutoCompleteProcessing::class,
            ],
            \Milestone\SmartKitchen\Events\TokenItemCompleting::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemCompleted::class =>  [
                CheckAndProceedAutoServe::class
            ],
            \Milestone\SmartKitchen\Events\TokenItemServing::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemServed::class =>  [
                TryRefreshingTokenProgress::class
            ],
            \Milestone\SmartKitchen\Events\TokenItemCancelling::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemCancelled::class =>  [
//                TryResettingTokenProgress::class,
//                PrintAcceptedItemsToken::class,
//                CheckAndProceedTokenBillCancellation::class,
            ],
            \Milestone\SmartKitchen\Events\TokenItemAdding::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemAdded::class =>  [
                TryDistributingAddedTokenItem::class,
//                TryRefreshingTokenProgress::class,
//                PrintAcceptedItemsToken::class,
//                CheckAndProceedTokenBillCancellation::class,
                ServeIfRequested::class,
            ],
            \Milestone\SmartKitchen\Events\TokenItemUpdating::class =>  [],
            \Milestone\SmartKitchen\Events\TokenItemUpdated::class =>  [
                AcceptedTokenItemStockAdjust::class,
//                PrintAcceptedItemsToken::class,
//                CheckAndProceedTokenBillCancellation::class,
            ],


            \Milestone\SmartKitchen\Events\TokenProgressMakingAsProcessing::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMadeAsProcessing::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMakingAsNew::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMadeAsNew::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMakingAsCompleted::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMadeAsCompleted::class =>  [
                CheckAndProceedForAutoBill::class,
                CheckForBillExistenceAndUpdate::class,
            ],
            \Milestone\SmartKitchen\Events\TokenProgressMakingAsBilled::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMadeAsBilled::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMakingAsCancelled::class =>  [],
            \Milestone\SmartKitchen\Events\TokenProgressMadeAsCancelled::class =>  [],

            \Milestone\SmartKitchen\Events\TokenCustomerSetting::class =>  [],
            \Milestone\SmartKitchen\Events\TokenCustomerSet::class =>  [],

            \Milestone\SmartKitchen\Events\TokenUpdated::class =>  [
                CheckAndProceedForSMS::class
            ],

            \Milestone\SmartKitchen\Events\BillCreating::class =>  [
                SetTokenCustomer::class
            ],
            \Milestone\SmartKitchen\Events\BillCreated::class =>  [
                TryRefreshingTokenProgress::class,
                CheckForAdvancePayments::class,
                CheckAndProceedForAutoPayment::class,
                CheckAndProceedForSMS::class
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

            \Milestone\SmartKitchen\Events\BillUpdated::class => [
                CheckAndProceedForSMS::class
            ],

            \Milestone\SmartKitchen\Events\PaymentCreating::class =>  [],
            \Milestone\SmartKitchen\Events\PaymentCreated::class =>  [
                UpdateBillProgress::class,
                CheckAndProceedForSMS::class
            ],

            \Milestone\SmartKitchen\Events\PaymentUpdated::class =>  [
                CheckAndProceedForSMS::class
            ],

            \Milestone\SmartKitchen\Events\KitchenStockReducing::class =>  [],
            \Milestone\SmartKitchen\Events\KitchenStockReduced::class =>  [],
            \Milestone\SmartKitchen\Events\KitchenStockIncrementing::class =>  [],
            \Milestone\SmartKitchen\Events\KitchenStockIncremented::class =>  [],

            \Milestone\SmartKitchen\Events\KitchenStatusCreating::class => [],
            \Milestone\SmartKitchen\Events\KitchenStatusCreated::class => [],
            \Milestone\SmartKitchen\Events\KitchenStatusUpdating::class => [],
            \Milestone\SmartKitchen\Events\KitchenStatusUpdated::class => [],

            \Milestone\SmartKitchen\Events\KitchenSaved::class => [
                CheckAndProcessRemoteKitchenAdd::class,
                CheckAndProcessRemoteKitchenRemove::class
            ],
            \Milestone\SmartKitchen\Events\KitchenItemSaved::class => [
                CheckAndProcessRemoteKitchenItemAdd::class
            ],
            \Milestone\SmartKitchen\Events\KitchenItemDeleted::class => [
                CheckAndProcessRemoteKitchenItemDelete::class
            ],

        ];
    }
}
