<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Events\TokenProgressMakingAsBilled;
use Milestone\SmartKitchen\Events\TokenProgressMadeAsBilled;
use Milestone\SmartKitchen\Models\Token;

class MakeTokenProgressAsBilled
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $token;

    public function __construct($token)
    {
        $this->token = Token::find($token);
    }

    public function handle()
    {
        Log::info('Initialized Token Billed Activity');
        $cProgress = $this->token->progress;
        switch ($cProgress){
            case 'New':
                if($this->token->type === 'Remote') Log::info('Remote Order. Stays in status New');
                else Log::warning('The token is in new status. Terminating activity');
                break;
            case 'Processing':
                Log::warning('The token is in processing status. Terminating activity');
                break;
            case 'Billed':
                Log::critical('The token is already billed, Cant generate again. Terminating activity');
                break;
            case 'Cancelled':
                Log::warning('This is a cancelled token..');
                break;
            default:
                $this->run();
                break;
        }
    }

    private function run(){
        TokenProgressMakingAsBilled::dispatch($this->token);
        $this->token->update(['progress' => 'Billed']);
        Log::info('Token progress made to billed!!');
        TokenProgressMadeAsBilled::dispatch($this->token);
    }
}
