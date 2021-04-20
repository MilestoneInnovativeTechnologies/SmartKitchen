<?php

namespace Milestone\SmartKitchen\Middlewares;

use Closure;
use Illuminate\Http\Request;


class SmartKitchenServer
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
        list($server,$location,$item,$id,$method) = request()->segments();
        define('LOCATION',$location); define('ITEM',$item); define('ID',$id); define('METHOD',$method);
        return $next($request);
    }
}
