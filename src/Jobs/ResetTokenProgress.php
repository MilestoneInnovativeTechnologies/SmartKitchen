<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Events\TokenProgressMadeAsNew;
use Milestone\SmartKitchen\Events\TokenProgressMakingAsNew;
use Milestone\SmartKitchen\Models\Token;
use Milestone\SmartKitchen\Models\TokenItem;

class ResetTokenProgress
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $token;

    public function __construct(Token $token)
    {
        $this->token = $token;
    }

    public function handle()
    {
        Log::info('Initialized Token Resetting Activity');
        $token = $this->token; $id = $token->id; $progress = $token->progress;
        if($progress === 'Processing') {
            if(TokenItem::where('token',$id)->whereIn('progress',['Processing','Completed'])->exists())
                return Log::info('Trying token reset: Some items are of progress, Processing or Completed. Cant reset.. Terminating');
            if(TokenItem::where('token',$id)->whereNotIn('progress',['New','Accepted','Cancelled'])->exists()){
                if(!TokenItem::where('token',$id)->whereNotIn('progress',['Served','Cancelled'])->exists()){
                    MakeTokenProgressCompleted::dispatch($token);
                }
            } else {
                $this->makeNew();
            }

        }
        return true;
    }

    private function makeNew(){
        TokenProgressMakingAsNew::dispatch($this->token);
        $this->token->update(['progress' => 'New']);
        Log::info('Token progress made to Processing!!');
        TokenProgressMadeAsNew::dispatch($this->token);
    }
}
