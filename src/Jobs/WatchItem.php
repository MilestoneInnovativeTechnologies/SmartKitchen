<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Middlewares\InternetJob;
use Milestone\SmartKitchen\Models\Sync;
use Milestone\SmartKitchen\Server\ServerController;
use Milestone\SmartKitchen\Server\SyncController;

class WatchItem implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $id, $sync;

    public function middleware() { return [new InternetJob]; }

    public function __construct($id){
        $this->id = $id;
        Sync::prepare($id);
    }

    public function handle(){
        Sync::process($this->id);
        $this->sync = $sync = Sync::find($this->id);
        $item = $sync->item; $item_id = $sync->item_id; $method = $sync->method;
        $url = ServerController::url($item,$item_id,$method);
        $methods = $sync->extra; $times = $this->Times($item,$methods);
        $this->ProcessResponse(Http::post($url,$times));
    }

    private static function item2Eloq($item){ return Str::of($item)->studly()->__toString(); }

    public function Times($item,$methods){
        $name = self::item2Eloq($item); $times = [];
        foreach ($methods as $method) $times[$method] = SyncController::getSyncTime("$name@$method")->toDateTimeString();
        return $times;
    }

    public function ProcessResponse($response){ //item,datetime,data
        if(!$response) return Sync::complete($this->id,false,'');
        Sync::complete($this->id,$response->successful(),$response->body());
        $resp = $response->json(); $name = self::item2Eloq($resp['item']); $time = $resp['datetime'];
        foreach($resp['data'] as $method => $locIdData){
            if(!empty($locIdData)){
                foreach ($locIdData as $location => $idData){
                    if(empty($idData)) continue;
                    foreach ($idData as $id => $data){
                        self::ProcessData($location,$resp['item'],$method,$id,$data);
                    }
                }
            }
            SyncController::setSyncTime("$name@$method",$time);
        }
        return null;
    }

    private static function ProcessData($location,$item,$method,$id,$data){
        if(empty($data)) return; $controller = ServerController::controller($item);
        $local_id = ($controller::$Create === $method) ? $id : ServerController::id($item,$id,$location);
        if(!$local_id) return Sync::add($item,$id,'watch',$controller::fresh());
        if(!method_exists($controller,$method)) return Log::critical('Processing Watch Data - No method exists ' . $item . '@' . $method);
        $need = call_user_func([$controller,$method],$local_id,$data,$location);
        if(!empty($need)) {
            foreach($need as $needItem) {
                $parts = ServerController::needStringItems($needItem);
                if($parts) Sync::add($parts['item'],$parts['id'],'watch',[$parts['method']]);
            }
        }

//        return call_user_func([$controller,$method],$local_id,$data,$location);
//        if($controller::$Create === $method) return call_user_func([$controller,$method],$id,$data,$location);
//        $local_id = ServerController::id($item,$id,$location);
//        if(!$local_id) return Sync::add($item,$id,'watch',$controller::fresh());
//        Log::critical('Processing Watch Data - No method exists ' . $item . '@' . $method);
        return false;
    }
}
