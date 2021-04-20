<?php

namespace Milestone\SmartKitchen\Server;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Milestone\SmartKitchen\Controllers\Log;
use Milestone\SmartKitchen\Models\Remote;
use Milestone\SmartKitchen\Models\Sync;

class ServerController extends Controller
{

    public function index(){ return 'server'; }

    public function watch(Request $request, $location, $item){

    }

    public function process(){
        $class = self::class(ITEM); $controller = self::controller(ITEM);
        if($controller::$Create === METHOD) return ['take' => call_user_func([$controller,METHOD],ID,request()->all())];
        $id = self::id(); if(!$id) return ['need' => self::fresh($class)];
        if(method_exists($controller,METHOD)) return ['take' => call_user_func([$controller,METHOD],$id,request()->all())];
        Log::critical('Server Process - No method exists ' . ITEM . '@' . METHOD); return [];
    }

    private static function id(){
        return Arr::get(Remote::where(['item' => ITEM, 'remote_id' => ID, 'location' => LOCATION])->latest()->first(),'local_id',null);
    }

    private static function fresh($class){
        return array_map(function($method){
            return ITEM . ':' . ID . '@' . $method;
        },call_user_func([$class,'fresh']));
    }

    public static function needSync($reqs){
        $reqs = is_array($reqs) ? $reqs : [$reqs];
        foreach($reqs as $req){
            list($itemId,$method) = explode('@',$req);
            list($item,$id) = explode(':',$itemId);
            Sync::add($item,$id,$method);
        }
    }

    public static function response($item,$id,$method){
        $url = ServerController::url($item,$id,$method);
        $params = ServerController::params($item,$id,$method);
        return Http::post($url,$params);
    }
}
