<?php

namespace Milestone\SmartKitchen\Middlewares;

use Closure;
use Illuminate\Http\Request;
use Milestone\SmartKitchen\Controllers\SubscriptionController;

class ClientKey
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
        if(sk('client_key') && SubscriptionController::code()) return $next($request);
        return redirect()->route('subscription');
    }
}
