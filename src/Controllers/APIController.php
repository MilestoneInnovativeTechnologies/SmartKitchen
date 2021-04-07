<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
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
        Settings::class,
    ];

    public function done(){ return []; }

    public function ping(){
        $after = cache()->get(ck()); $before = now()->toDateTimeString();
        $asset = ($after === '2000-01-01 00:00:01') ? 'NO' : 'YES';
        $data = [];
        foreach (self::$Models as $model){
            if(in_array($model,self::$Assets) && $asset === 'NO') continue;
            $modelObj = new $model;
            $table = self::getTableName($modelObj);
            $lid = tc($table);
            if(self::recordsExists($modelObj,$after,$before,$lid)){
                $records = self::getRecords($modelObj,$after,$before,$lid);
                $data[$table] = $records; clid($table,$records);
            }
        }
        cache()->put(ck(),$before);
        return $data;
    }

    public static function recordsExists($modelObj,$after,$before,$lid){
        return $modelObj->sync($after,$before,$lid)->exists();
    }

    public static function getTableName($modelObj){
        return $modelObj->getTable();
    }

    public static function getRecords($model,$after,$before,$lid){
        if(method_exists($model,'fetch')) return $model::fetch($after,$before,$lid);
        if(method_exists($model,'scopeOwn')) return $model->own()->sync($after,$before,$lid)->get();
        return $model->sync($after,$before,$lid)->get();
    }
}
