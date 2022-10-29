<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Milestone\SmartKitchen\Jobs\FireSMS;
use Milestone\SmartKitchen\Models\Bill;
use Milestone\SmartKitchen\Models\Customer;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\ItemGroup;
use Milestone\SmartKitchen\Models\ItemProp;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\KitchenStatus;
use Milestone\SmartKitchen\Models\Menu;
use Milestone\SmartKitchen\Models\Payment;
use Milestone\SmartKitchen\Models\Price;
use Milestone\SmartKitchen\Models\PriceList;
use Milestone\SmartKitchen\Models\Remote;
use Milestone\SmartKitchen\Models\Seating;
use Milestone\SmartKitchen\Models\Settings;
use Milestone\SmartKitchen\Models\Tax;
use Milestone\SmartKitchen\Models\Token;
use Milestone\SmartKitchen\Models\TokenItem;
use Milestone\SmartKitchen\Models\User;

class APIController extends Controller
{

    public static $Models = [
        Customer::class,
        Bill::class,
        ItemProp::class,
        Item::class,
        ItemGroup::class,
        Kitchen::class,
        KitchenItem::class,
        KitchenStatus::class,
        Menu::class,
        Payment::class,
        Price::class,
        PriceList::class,
        Seating::class,
        Tax::class,
        Token::class,
        TokenItem::class,
        User::class,
        Settings::class,
        Remote::class,
    ];

    public static $Assets = [
        Customer::class,
        ItemProp::class,
        Item::class,
        ItemGroup::class,
        Kitchen::class,
        KitchenItem::class,
        Menu::class,
        Price::class,
        PriceList::class,
        Seating::class,
        Tax::class,
        User::class,
        Settings::class,
    ];

    public function done(){ return []; }

    public function ping(){
        $after = cache()->get(ck()); $before = now()->toDateTimeString();
        $asset = ($after === '2000-01-01 00:00:01') ? 'NO' : 'YES';
        $data = []; $cache_headers = ['SK-Ping-After' => $after,'SK-Ping-Before' => $before,'SK-Ping-Asset-Fetch' => $asset];
        foreach (self::$Models as $model){
            if(in_array($model,self::$Assets) && $asset === 'NO') continue;
            $modelObj = new $model;
            $table = self::getTableName($modelObj);
            $lid = tc($table);
            $cache_headers['SK-Ping-Last_ID-' . $table] = $lid;
            if(self::recordsExists($modelObj,$after,$before,$lid)){
                $records = self::getRecords($modelObj,$after,$before,$lid);
                $data[$table] = $records; clid($table,$records);
            }
        }
        cache()->put(ck(),$before);
        if(features('EZ85V') === 'Yes') $this->processSMSQueue();
        return $data;//response($data,200,$cache_headers);
    }

    public function out_ping(){
        $after = request()->header('OP-After'); $asset = ($after === '2000-01-01 00:00:01') ? 'NO' : 'YES';
        $data = [];
        $max = ini_get('max_execution_time') + time();
        do{
            $before = now()->toDateTimeString(); $headers = ['OP-Before' => $before];
            foreach (self::$Models as $model){
                if(in_array($model,self::$Assets) && $asset === 'NO') continue;
                $modelObj = new $model;
                $table = self::getTableName($modelObj); $lid_key = 'OP-Lid-' . $table;
                $lid = Arr::get($headers,$lid_key,request()->header($lid_key,0));
                if(self::recordsExists($modelObj,$after,$before,$lid)){
                    $records = self::getRecords($modelObj,$after,$before,$lid);
                    $data[$table] = $records;
                    $headers[$lid_key] = clid($table,$records,true);
                }
            }
            if(!empty($data)) break;
            sleep(1);
            $after = $before; $asset = 'NO';
        } while($max - time() > 3);
        return response($data,200,$headers);
    }

    public static function recordsExists($modelObj,$after,$before,$lid){
        if(!$lid && !$after) return false;
        return $modelObj->sync($after,$before,$lid)->exists();
    }

    public static function getTableName($modelObj){
        return $modelObj->getTable();
    }

    public static function getRecords($model,$after,$before,$lid){
        if(method_exists($model,'fetch')) return $model::fetch($after,$before,$lid);
        if(method_exists($model,'scopeOwn')) return $model->own()->sync($after,$before,$lid)->take(data_limit())->get();
        return $model->sync($after,$before,$lid)->take(data_limit())->get();
    }

    public function processSMSQueue(){
        if(Cache::has('sms_queue')) {
            $queue = Cache::pull('sms_queue',[]);
            if(!empty($queue)) {
                [$url,$method,$params] = array_shift($queue);
                FireSMS::Fire($url,$method,$params);
                if(!empty($queue)) Cache::put('sms_queue',$queue,3*60);
            } else Cache::forget('sms_queue');
        }
    }
}
