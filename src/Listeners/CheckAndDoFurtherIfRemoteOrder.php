<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Controllers\BillController;
use Milestone\SmartKitchen\Events\TokenItemsSaved;
use Milestone\SmartKitchen\Jobs\RemoteAddToken;
use Milestone\SmartKitchen\Jobs\RemoteAddTokenItems;
use Milestone\SmartKitchen\Models\Token;

class CheckAndDoFurtherIfRemoteOrder
{

    public function __construct()
    {
        //
    }

    public function handle(TokenItemsSaved $event)
    {
        $Token = Token::find($event->token);
        if(!$Token || $Token->type !== 'Remote') return;
        if(!request()->filled('_location')) return;
        request()->merge(['token' => $event->token]);
        $branch = request()->input('_location');
        if($branch) app()->call(BillController::class,[],'create');
        RemoteAddToken::dispatch($event->token,$branch);
        RemoteAddTokenItems::dispatch($event->token,$branch);
    }
}
