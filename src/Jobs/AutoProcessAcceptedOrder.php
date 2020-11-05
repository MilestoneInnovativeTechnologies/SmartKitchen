<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Events\TokenItemProcessed;
use Milestone\SmartKitchen\Events\TokenItemProcessing;
use Milestone\SmartKitchen\Models\TokenItem;

class AutoProcessAcceptedOrder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tokenItem, $kitchen, $user;

    public function __construct(TokenItem $tokenItem, $kitchen, $user)
    {
        $this->tokenItem = $tokenItem;
        $this->kitchen = $kitchen;
        $this->user = $user;
    }

    public function handle()
    {
        if($this->tokenItem->progress !== 'Accepted') return;
        $tokenItem = $this->tokenItem; $tokenItem->progress = 'Processing';
        TokenItemProcessing::dispatch($tokenItem);
        $tokenItem->save(); TokenItemProcessed::dispatch($tokenItem);
    }
}
