<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Jobs\FireSMS;

class CheckAndProceedForSMS
{

    public function __construct()
    {
        //
    }

    public function handle($event)
    {
        $item = $event->item;
        $happened = $event->happened;
        $action = null;
        if(features('EZ85V') !== 'Yes' || settings('sms_disable',true)) return;
        if($item === 'token' && $happened === 'updated') $action = $event->action;
        $sms_key = Str::start(implode(":",array_filter([$item,$happened,$action])),"_sms_");
        $smses = settings($sms_key); if(!$smses) return;
        FireSMS::dispatch(explode(",",$smses),$event->token_id);
    }

}
