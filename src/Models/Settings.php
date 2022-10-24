<?php

namespace Milestone\SmartKitchen\Models;

use Illuminate\Support\Facades\Cache;

class Settings extends Model
{
    public static $cache_key = 'settings';

    protected static function booted(){
        static::saved(function (){ self::Cache(); });
        static::deleted(function (){ self::Cache(); });
    }

    private static function Cache(){
        $settings = self::pluck('value','name')->toArray();
        Cache::forever(self::$cache_key,$settings);
    }
}
