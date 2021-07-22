<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Controllers\BillController;
use Milestone\SmartKitchen\Events\TokenItemsSaved;
use Milestone\SmartKitchen\Models\Token;

class CheckAndDoFurtherIfHavePayment
{

    public function __construct()
    {
        //
    }

    public function handle(TokenItemsSaved $event)
    {
        $Token = Token::find($event->token);
        if(!$Token || $Token->type === 'Remote') return;
        request()->whenHas('advance_amount',function() use($event){
            request()->merge(['token' => $event->token]);
            app()->call(BillController::class,[],'create');
        });
    }
}
