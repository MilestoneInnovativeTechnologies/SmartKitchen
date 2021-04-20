<?php

namespace Milestone\SmartKitchen\Server;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Jobs\Log;
use Milestone\SmartKitchen\Jobs\SyncItem;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\Remote;
use Milestone\SmartKitchen\Models\Sync;

class SyncController extends Controller
{
    private static $Watches = [
        'kitchen' => ['Item@']
    ];

    private static $SyncTimeCacheKey = 'sync_time';

    public static function init(){
        if(!Sync::enabled()) return;
        self::trip(); self::watch();
    }

    public static function trip(){
        if(empty(Sync::pending()) && empty(Kitchen::getClouds())) return;
        if(Sync::since() < sk('sync_delay')) return;
        if(!internet()) return;
        self::dispatchPendingSyncs();
    }

    public static function dispatchPendingSyncs(){
        if(empty(Sync::pending())) return;
        foreach (Sync::pending() as $sync)
            SyncItem::dispatch($sync);
    }

    public static function watch(){
        $watches = []; $remotes = Remote::cache();
        if(!empty(Kitchen::getClouds())) array_push($watches,'Token','Token@Items');
        if(!empty($remotes)){
            if(in_array('item',$remotes) && in_array('kitchen',$remotes)) array_push($watches,'Item');
            if(in_array('kitchen',$remotes)) array_push($watches,'Kitchen','Kitchen@status','Kitchen@items');
            if(in_array('token',$remotes)) array_push($watches,'Token@Items');
        }
        $watches = array_unique($watches);
        if(empty($watches)) return; if(!internet()) return;
        self::initWatches($watches);
    }

    private static function initWatches($watches){
        Log::info('WATCHES: ' . count($watches));
    }

    private static function getInterval($item){
        $class = Str::of(ServerController::class)->replaceLast('Server',Str::of($item)->studly()->__toString())->__toString();
        return $class::$interval;
    }

    private static function setSyncTime($cls){
        $sync_time = Cache::get(self::$SyncTimeCacheKey,[]);
        $sync_time[$cls] = now()->toDateTimeString();
        Cache::forever(self::$SyncTimeCacheKey,$sync_time);
    }
    private static function getSyncTime($cls){
        $sync_time = Cache::get(self::$SyncTimeCacheKey,[]);
        return Carbon::parse(Arr::get($sync_time,$cls,now()->toDateTimeString()));
    }

}
