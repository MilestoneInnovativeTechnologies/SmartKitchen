<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Facades\Cache;

class Remote extends Model
{

    protected $table = 'remote';
    private static $RemoteItemsCacheKey = 'remote_items';

    protected static function booted(){
        static::created(function ($Remote){ $item = $Remote->item; self::cache($item,true); });
        static::deleted(function ($Remote){ $item = $Remote->item; if(!Remote::where('item',$item)->exists()) self::cache($item,false); });
    }

    public static function cache($item = null, $add = true){
        $remote_items = Cache::get(self::$RemoteItemsCacheKey,[]); if(!$item) return $remote_items;
        if($add) $remote_items[] = $item; else $remote_items = array_diff($remote_items,[$item]);
        $remote_items = array_unique($remote_items); Cache::forever(self::$RemoteItemsCacheKey,$remote_items);
        return $remote_items;
    }

    public static function included(){ return !empty(self::cache()); }

}
