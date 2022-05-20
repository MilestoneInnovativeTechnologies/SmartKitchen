<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Controllers\TokenItemController;
use Milestone\SmartKitchen\Models\Token;

class ServeAllTokenItems
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $token, $user;

    public function __construct($token,$user)
    {
        $this->token = Token::with(['Items'])->find($token);
        $this->user = $user;
    }

    public function handle()
    {
        $user = $this->user ?: Auth::id();
        $this->token->Items->each(function($token_item)use($user){
            if($token_item->progress !== 'Served' && $token_item->progress !== 'Cancelled'){
                TokenItemController::Serve($token_item->id,$user);
            }
        });
    }
}
