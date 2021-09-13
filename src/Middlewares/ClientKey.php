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
        if(!sk('client_key')){
            if($request->routeIs('login')) return $next($request);
            else return redirect()->route('login');
        }
        elseif(!SubscriptionController::code()) {
            if($request->routeIs('subscription')) return $next($request);
            else return redirect()->route('subscription');
        }
        return $next($request);
    }
}
