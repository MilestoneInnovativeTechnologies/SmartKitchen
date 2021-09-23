<?php

namespace Milestone\SmartKitchen\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\ItemGroup;
use Milestone\SmartKitchen\Models\Menu;
use Milestone\SmartKitchen\Models\Model;
use Milestone\SmartKitchen\Models\Price;
use Milestone\SmartKitchen\Models\Seating;

class AssetController extends Controller
{

    public static function AssetRoute($model){
        $class = Str::replaceLast('Model',ucfirst($model),Model::class);
        $time = Carbon::parse($class::max('updated_at') ?? '2000-01-01 00:00:01')->unix();
        return route('asset',compact('time','model'));
    }

    public static function JSAsset($time,$model){
        $class = Str::replaceLast('Model',ucfirst($model),Model::class);
        return response('const _ASSET_' . ucfirst($model) . ' = ' . $class::all()->toJson())->withHeaders(['Content-Type' => 'text/javascript']);
    }

    public static function OnlineMenuAssets(){
        $_Menus = Menu::where(['status' => "Active"])->pluck('groups','id')->toArray();
        $_Groups = ItemGroup::where(['status' => "Active"])->pluck('items','id')->toArray();
        $Seats = Seating::where(['status' => "Active"])->get()->map(function($seat){ return $seat->only(['id','price_list']); })->toArray();
        $Prices = Price::get()->map(function($price){ return array_merge($price->only(['item','price']),['list' => $price->price_list]); })->toArray();
        $group_menus = []; foreach($_Menus as $mid => $groups) foreach($groups as $gid) $group_menus[$gid][] = $mid;
        $item_groups = []; foreach($_Groups as $gid => $items) foreach($items as $iid) $item_groups[$iid][] = $gid;
        $Groups = ItemGroup::where(['status' => "Active"])->get()->map(function($group)use($group_menus){
            return ['id' => $group->id,'name' => $group->name,'menus' => $group_menus[$group->id]];
        })->toArray();
        $Items = Item::where(['status' => "Active"])->get()->map(function($item)use($item_groups){ return array_merge($item->only(['id','name','detail','image']),['groups' => $item_groups[$item->id]]); })->toArray();
        return compact('Groups','Items','Seats','Prices');
    }
}
