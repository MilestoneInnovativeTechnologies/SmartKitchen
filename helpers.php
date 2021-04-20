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
function clid($table,$col){
    $lid = ($col instanceof \Illuminate\Support\Collection) ? $col->max('id') : 0;
    if($lid) tc($table,intval($lid));
}
function human_date($datetime){ return Carbon::parse($datetime)->format("d/M/Y"); }
function human_date2($datetime){ return Carbon::parse($datetime)->format("d/m/y"); }
function human_time($datetime){ return Carbon::parse($datetime)->format("h:i A"); }
function precise($number,$precision = 2,$separator = ","){ return number_format(round(floatval($number),$precision),2,'.',$separator); }
function truncate($string,$length) {
    if(strlen($string) <= $length) return str_pad($string,$length,' ',STR_PAD_RIGHT);
    return substr($string,0,$length-2) . '..';
}