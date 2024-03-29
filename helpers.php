<?php

use Illuminate\Support\Carbon;

function ck(){
    return '_' . auth()->payload()->get('jti') . '_';
}

function sk($key){ return trim(config('sk.' . $key)); }

function tc($table,$id = null){
    $ck = ck() . $table . '_';
    $lid = intval(cache()->get($ck,0));
    if(!$id) return $lid;
    $id = intval($id);
    if($id > $lid) cache()->put($ck,$id,now()->addDays(7));
    return tc($table);
}
function clid($table,$col,$return = null){
    $lid = ($col instanceof \Illuminate\Support\Collection) ? $col->max('id') : 0;
    if($return) return $lid;
    if($lid) tc($table,intval($lid));
    return null;
}
function human_date($datetime){ return Carbon::parse($datetime)->format("d/M/Y"); }
function human_date2($datetime){ return Carbon::parse($datetime)->format("d/m/y"); }
function human_time($datetime){ return Carbon::parse($datetime)->format("h:i A"); }
function precise($number,$precision = 2,$separator = ","){ return number_format(round(floatval($number),$precision),2,'.',$separator); }
function truncate($string,$length) {
    if(strlen($string) <= $length) return str_pad($string,$length,' ',STR_PAD_RIGHT);
    return substr($string,0,$length-2) . '..';
}
function settings($name,$bool = false){
    $value = \Illuminate\Support\Arr::get(\Illuminate\Support\Facades\Cache::get(\Milestone\SmartKitchen\Models\Settings::$cache_key),$name);
    if(!$bool) return $value;
    if(in_array($value,explode(",","1,true,True,TRUE,yes,Yes,YES,ON,on,On"))) return true;
    if(in_array($value,explode(",","0,false,False,FALSE,no,No,NO,off,Off,OFF"))) return false;
    return null;
}

function data_limit(){ return settings('data_limit') ?: 1500; }
function fetch_from_date(){
    $day_start = settings('day_start');
    if($day_start){
        return now()->setTimeFromTimeString($day_start)->isFuture()
            ? now()->setTimeFromTimeString($day_start)->subDay()->toDateTimeString()
            : now()->setTimeFromTimeString($day_start)->toDateTimeString();
    }
    $recent_days_length = settings('recent_days_length') ?: sk('recent_days_length') ?: 7;
    return now()->subRealDays($recent_days_length)->startOfDay()->toDateTimeString();
}
function features($key = null){
    $features = \Illuminate\Support\Facades\Cache::rememberForever('features',function(){
        $subscription = \Illuminate\Support\Facades\Storage::get('subscription');
        $P1 = explode("/",$subscription)[0];
        [$keys,$values] = \Milestone\SmartKitchen\Controllers\SubscriptionController::Decode(substr($P1,39,strlen($P1)-37-39));
        return array_combine($keys,$values);
    });
    return $key ? \Illuminate\Support\Arr::get($features,$key) : $features;
}