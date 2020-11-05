<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Events\TokenProgressMadeAsProcessing;
use Milestone\SmartKitchen\Events\TokenProgressMakingAsProcessing;
use Milestone\SmartKitchen\Models\Token;

class MakeTokenProgressProcessing
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $token;

    public function __construct(Token $token)
    {
        $this->token = $token;
    }

    public function handle()
    {
        Log::info('Initialized Token Processing Activity');
        $cProgress = $this->token->progress;
        switch ($cProgress){
            case 'Completed':
                Log::critical('The token is in completed status. Terminating activity');
                break;
            case 'Billed':
                Log::critical('The token is in billed status, Cant make as processing. Terminating activity');
                break;
            case 'Cancelled':
                Log::critical('The token is in cancelled status, Cant make as processing. Terminating activity');
                break;
            case 'Processing':
                Log::info('The token already in processing status!!');
                $this->run();
                break;
            default:
                $this->run();
                break;
        }
    }

    private function run(){
        TokenProgressMakingAsProcessing::dispatch($this->token);
        $this->token->update(['progress' => 'Processing']);
        Log::info('Token progress made to Processing!!');
        TokenProgressMadeAsProcessing::dispatch($this->token);
    }
}
