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

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function handle()
    {
        Log::info('Initialized Token Resetting Activity');
        $token = Token::find($this->token); if(!$token) return Log::warning('Token does not exists to reset, Token ID: ' . $this->token);
        $id = $token->id; $progress = $token->progress;
        if($progress === 'Processing') {
            if(TokenItem::where('token',$id)->whereIn('progress',['Processing','Completed'])->exists())
                return Log::info('Trying token reset: Some items are of progress, Processing or Completed. Cant reset.. Terminating');
            if(TokenItem::where('token',$id)->whereNotIn('progress',['New','Accepted','Cancelled'])->exists()){
                if(!TokenItem::where('token',$id)->whereNotIn('progress',['Served','Cancelled'])->exists()){
                    MakeTokenProgressCompleted::dispatch($token);
                }
            } else {
                $this->makeNew($token);
            }

        }
        return true;
    }

    private function makeNew($token){
        TokenProgressMakingAsNew::dispatch($token->id);
        $token->update(['progress' => 'New']);
        Log::info('Token progress made to Processing!!');
        TokenProgressMadeAsNew::dispatch($token->id);
    }
}
