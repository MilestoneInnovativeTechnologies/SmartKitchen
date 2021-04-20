<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

class Sync extends Model
{

    protected $casts = [
        'timing'   =>  'array',
        'extra'   =>  'array',
    ];

    private static $syncEntryCacheKey = 'sync_last_entry';
    private static $syncTimeCacheKey = 'last_sync_time';
    private static $syncPendingCacheKey = 'pending_syncs';

    protected static function booted(){
        static::creating(function ($Sync){
            $timingData = self::timingData($Sync);
            $Sync->timing = [$timingData];
            self::cacheLastSyncEntry($timingData['datetime']);
        });
        static::updating(function ($Sync){
            if($Sync->isDirty('progress') || $Sync->isDirty('status')){
                $timings = (array) Arr::get($Sync,'timing',[]); $timing = self::timingData($Sync);
                array_push($timings,$timing);
                $Sync->timing = $timings;
                if($Sync->isDirty('progress') && $Sync->progress === 'Processing') self::cacheLastSyncTime($timing['datetime']);
            }
        });
        static::saved(function (){
            $pending = Sync::where(['status' => 'New', 'progress' => 'New'])->orWhere(function($Q){ return $Q->where('status','Failed')->where('retry','<',sk('sync_retry')); })->pluck('id')->toArray();
            sort($pending);
            Cache::put(self::$syncPendingCacheKey,$pending);
        });
    }

    public static function enabled(){ return sk('server') && sk('location'); }
    public static function since(){ return Carbon::parse(self::lastSyncTime())->diffInSeconds(now()); }

    public static function cacheLastSyncEntry($datetime){ $cacheKey = self::$syncEntryCacheKey; Cache::put($cacheKey,$datetime); }
    public static function cacheLastSyncTime($datetime){ $cacheKey = self::$syncTimeCacheKey; Cache::put($cacheKey,$datetime); }
    public static function lastSyncEntry(){ $cacheKey = self::$syncEntryCacheKey; return Cache::get($cacheKey); }
    public static function lastSyncTime(){ $cacheKey = self::$syncTimeCacheKey; return Cache::get($cacheKey,'2000-01-01 00:00:01'); }
    public static function pending(){ $cacheKey = self::$syncPendingCacheKey; return Cache::get($cacheKey,[]); }

    public static function timingData($Sync){
        $sync = $Sync->toArray();
        return ['progress' => Arr::get($sync,'progress','New'),'status' => Arr::get($sync,'status','New'), 'time' => time(), 'datetime' => now()->toDateTimeString()];
    }

    public static function add($item,$item_id,$method,$extra = null){
        if(!self::where(compact('item','item_id','method'))
            ->where(function($Q){
                $Q->where(['status' => 'New', 'progress' => 'New'])
                    ->orWhere(function($QQ){
                        $QQ->where(['status' => 'Failed', 'progress' => 'Completed'])
                            ->where('retry','<',sk('sync_retry'));
                    });
            })->exists())
            return self::create(compact('item','item_id','method','extra'));
        return null;
    }

    public static function process($id){
        $sync = self::find($id);
        $sync->progress = 'Processing';
        if($sync->status === 'Failed') $sync->retry += 1;
        $sync->save();
    }

    public static function complete($id,$success,$response){
        $sync = self::find($id);
        $sync->progress = 'Completed'; $sync->status = $success ? 'Done' : 'Failed';
        $sync->response = substr($response,0,1000);
        $sync->save();
    }
}
