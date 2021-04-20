<?php

namespace Milestone\SmartKitchen\Middlewares;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SmartKitchenAction
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
        $item = $request->route('item');
        $action = $request->route('action');
        $class = Str::of(self::class)->replace('Middlewares','Controllers')->replaceLast('SmartKitchenAction',Str::of($item)->ucfirst()->append('Controller')->__toString())->__toString();
        $call = "$class@$action";
        $result = app()->call($call);//call_user_func([new $class,$action],$request);
        $response = $next($request);
        $response->header('SK-Action-Result',json_encode($result));
        return $response;
    }
}
