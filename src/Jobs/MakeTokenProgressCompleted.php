<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Events\TokenProgressMadeAsCompleted;
use Milestone\SmartKitchen\Events\TokenProgressMakingAsCompleted;
use Milestone\SmartKitchen\Models\Token;

class MakeTokenProgressCompleted
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $token;

    public function __construct(Token $token)
    {
        $this->token = $token;
    }

    public function handle()
    {
        Log::info('Initialized Token Completion Activity');
        $cProgress = $this->token->progress;
        switch ($cProgress){
            case 'Completed':
                Log::warning('The token is already in completed status. Terminating activity');
                break;
            case 'Billed':
                Log::critical('The token is already in billed status, Cant make to Completed. Terminating activity');
                break;
            case 'Cancelled':
                Log::critical('The token is already in cancelled status, Cant make to Completed. Terminating activity');
                break;
            case 'New':
                Log::warning('Token in new, directly making as Completed.');
                $this->run();
                break;
            default:
                $this->run();
                break;
        }
    }

    private function run(){
        TokenProgressMakingAsCompleted::dispatch($this->token);
        $this->token->update(['progress' => 'Completed']);
        Log::info('Token progress made to completed!!');
        TokenProgressMadeAsCompleted::dispatch($this->token);
    }
}
