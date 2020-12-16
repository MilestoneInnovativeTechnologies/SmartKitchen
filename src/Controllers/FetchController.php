<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Model;

class FetchController extends Controller
{
    public function handle($item){
        $controller = Str::of(self::class)->replace('FetchController',Str::of($item)->title()->append('Controller')->__toString())->__toString();
        $model = Str::of(Model::class)->replaceLast('Model',Str::of($item)->title()->__toString())->__toString();
        $role = auth()->user()->role;
        if(property_exists($model,'fetchMethods') && array_key_exists($role,$model::$fetchMethods)){
            $action = $model::$fetchMethods[$role];
            return call_user_func([new $controller,$action]);
        }
        return [];
    }
}
