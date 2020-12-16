<?php
function ck(){
    return '_' . auth()->payload()->get('jti') . '_';
}
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
