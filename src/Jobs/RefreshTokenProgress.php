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
        $this->token = Token::with(['Items' => function($Q){ return $Q->withoutGlobalScopes(); },'Bill' => function($Q){ return $Q->withoutGlobalScopes(); }])->find($token);
    }

    public function handle()
    {
        Log::info('Initialized Token Refresh Activity. Token: ' . $this->token->id);
        $items = $this->token->items; $progresses = $items->map->progress;
        if($items->isEmpty()) { Log::critical('Items are empty'); return $this->makeProgress('New'); }
        if($progresses->contains('Processing')) { Log::info('Have items in Processing'); return $this->makeProgress('Processing'); }
        if($progresses->every(function($progress){ return $progress === 'Cancelled'; })) {
            Log::info('All Items cancelled.. Token is cancelling..');
            if($this->token->Bill) {
                $this->makeProgress('Cancelled');
                Log::info('Token has bill generated, Cancelling that bill');
                return TryMakingBillAsCancelled::dispatch($this->token->Bill->id);
            } else return $this->makeProgress('Cancelled');
        }
        if($progresses->every(function($progress){ return in_array($progress,['Served','Cancelled']); })) {
            if($progresses->contains('Cancelled')) Log::info('All Items are served and cancelled.. Token is completed..');
            else Log::info('All Items served.. Token is completed..');
            if($this->token->Bill) { Log::info('Token has bill generated, Token progress to Billed'); $this->makeProgress('Billed'); }
            else $this->makeProgress('Completed');
            return true;
        }
        if($progresses->every(function($progress){ return in_array($progress,['New','Accepted','Cancelled']); })) {
            if($progresses->every(function($progress){ return $progress === 'Cancelled'; })) { Log::info('All Items cancelled.. Token cancelling..'); $this->makeProgress('Cancelled'); }
            else { Log::info('Every items are of New/Accepted.. Token to New'); $this->makeProgress('New'); }
            return true;
        }
        if($progresses->contains('New') || $progresses->contains('Accepted') || $progresses->contains('Completed')) {
            Log::info('Still have few items of processing status.. Token to Processing');
            return $this->makeProgress('Processing');
        }
        Log::critical('No any criteria matching.. Urgent attention needed for token: ' . $this->token->id);
        return true;
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
