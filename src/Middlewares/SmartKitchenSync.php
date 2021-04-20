<?php

namespace Milestone\SmartKitchen\Middlewares;

use Closure;
use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Sync;
use Milestone\SmartKitchen\Server\SyncController;


class SmartKitchenSync
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(Sync::since() > 5) SyncController::init();
        return $next($request);
    }
}
