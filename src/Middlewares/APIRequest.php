<?php

namespace Milestone\SmartKitchen\Middlewares;

use Closure;
use Illuminate\Http\Request;

class APIRequest
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
        $authorization = $request->header('Authorization'); $token = trim(str_ireplace('Bearer','',$authorization));
        $request->merge(json_decode(base64_decode(explode(".",$token)[1]),true));
        return $next($request);
    }
}
