<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Controllers\TokenItemController;
use Milestone\SmartKitchen\Events\TokenItemServed;
use Milestone\SmartKitchen\Jobs\RefreshTokenProgress;
use Milestone\SmartKitchen\Models\Token;
use Milestone\SmartKitchen\Models\TokenItem;

class CheckAndProceedAutoServe
{
    public function __construct()
    {
        //
    }
    public function handle($event)
    {
        $Token = Token::find($event->token);
        $type = $Token->type;
        $settings_name = Str::snake("Auto Serve $type token Item On Complete");
        if(settings($settings_name,true) === true || (settings($settings_name,true) === null && settings(Str::snake("Auto Serve Token Item On Complete"),true) === true))
            TokenItemController::Serve($event->tokenItemID,$event->user);
    }
}
