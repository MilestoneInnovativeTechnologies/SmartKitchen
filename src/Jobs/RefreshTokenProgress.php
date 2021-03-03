<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Token;

class RefreshTokenProgress
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $token;

    public function __construct($token)
    {
        $this->token = Token::with(['Items','Bill'])->find($token);
    }

    public function handle()
    {
        Log::info('Initialized Token Refresh Activity');
        $items = $this->token->items;
        if($items->isEmpty()) {
            Log::critical('Items are empty');
            $this->makeProgress('New');
        } elseif($this->token->Bill) {
            Log::info('Token has bill, Billed');
            $this->makeProgress('Billed');
        } elseif($items->every(function($item){ return in_array($item->progress,['Served','Cancelled']); })) {
            Log::info('Every items are of Served or Cancelled');
            $this->makeProgress('Completed');
        } elseif($items->every(function($item){ return in_array($item->progress,['New','Accepted','Cancelled']); })) {
            Log::info('Every items are of New, Accepted or Cancelled');
            $this->makeProgress('New');
        } else {
            Log::info('Have items in Processing');
            $this->makeProgress('Processing');
        }
    }

    private function makeProgress($progress){
        $class = Str::of('\Milestone\SmartKitchen\Events\TokenProgressMakingAs')->append($progress)->__toString();
        $class::dispatch($this->token);
        $this->token->update(['progress' => $progress]);
        Log::info('Token progress made to ' .$progress. '!!');
        $class = Str::of('\Milestone\SmartKitchen\Events\TokenProgressMadeAs')->append($progress)->__toString();
        $class::dispatch($this->token);
    }
}
