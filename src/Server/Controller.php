<?php

namespace Milestone\SmartKitchen\Server;

use App\Http\Controllers\Controller as BaseController;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Controllers\Log;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\Model;
use Milestone\SmartKitchen\Models\Remote;

class Controller extends BaseController
{
    public static function class($item){
        return Str::of(self::class)->replaceLast('Controller',Str::of($item)->studly()->append('Controller')->__toString())->__toString();
    }

    public static function controller($item){
        $class = self::class($item);
        return new $class;
    }

    public static function url($item,$id,$method){
        return implode('/',[sk('server'),'server',sk('location'),$item,$id,$method]);
    }

    public static function params($item,$id,$method){
        $class = self::class($item); $Params = [];
        $data = Arr::get($class::$Params,$method,[]);
        if(empty($data)) Log::warning('Server Sync: No params defined for, ' . $item . '@' . $method);
        else foreach($data as $tableId => $params) {
            if (substr($tableId, 0, 1) === '[' && substr($tableId, -1) === ']') {
                $records = call_user_func([new $class, substr($tableId, 1, -1)], $id);
            } else {
                list($model,$where) = explode('@',$tableId);
                $Model = Str::of(Model::class)->replaceLast('Model',$model)->__toString();
                $records = $Model::where($where,$id)->get();
            }
            if($records->count() > 0) {
                if ($params === '*') $params = array_keys($records->first()->toArray());
                $Params = $records->map(function ($record) use ($params) {
                    return Arr::only($record->toArray(), $params);
                })->toArray();
            }
        }
        return $Params;
    }

    public static function remote($local_id, $item = null, $remote_id = null){
        $location = LOCATION; $item = $item ?: ITEM; $remote_id = $remote_id ?: ID;
        Remote::updateOrCreate(compact('item','location','remote_id'),compact('local_id'));
    }
}
