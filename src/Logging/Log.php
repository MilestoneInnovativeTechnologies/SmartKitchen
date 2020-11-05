<?php


namespace Milestone\SmartKitchen\Logging;


use Illuminate\Support\Facades\Log as BaseLog;

class Log
{

    public static function msg($text, $type = 'info'){ BaseLog::channel('sk')->$type($text); }
    public static function info($text){ self::msg($text); }
    public static function warning($text){ self::msg('Warning: ' . $text); }
    public static function critical($text){ self::msg('Critical: '. $text); }
    public static function error($text){ self::msg('Error: ' . $text); }

}
