<?php

namespace Milestone\SmartKitchen\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
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
        $class = self::ClassName($model);
        $time = Carbon::parse($class::max('updated_at') ?? '2000-01-01 00:00:01')->unix();
        return route('asset',compact('time','model'));
    }

    public static function JSAsset($time,$model){
        $class = self::ClassName($model);
        return response('const _ASSET_' . ucfirst($model) . ' = ' . $class::all()->toJson())->withHeaders(['Content-Type' => 'text/javascript']);
    }

    public static function OnlineMenuAssets(){
        $_Menus = Menu::where(['status' => "Active"])->pluck('groups','id')->toArray() ?: [];
        $_Groups = ItemGroup::where(['status' => "Active"])->pluck('items','id')->toArray() ?: [];
        $Seats = Seating::where(['status' => "Active"])->get()->map(function($seat){ return $seat->only(['id','price_list']); })->toArray();
        $Prices = Price::get()->map(function($price){ return array_merge($price->only(['item','price']),['list' => $price->price_list]); })->toArray();
        $group_menus = []; foreach($_Menus as $mid => $groups) foreach((array) $groups as $gid) $group_menus[$gid][] = $mid;
        $item_groups = []; foreach($_Groups as $gid => $items) foreach((array) $items as $iid) $item_groups[$iid][] = $gid;
        $Groups = ItemGroup::where(['status' => "Active"])->get()->map(function($group)use($group_menus){
            return Arr::has($group_menus,$group->id) ? ['id' => $group->id,'name' => $group->name,'menus' => $group_menus[$group->id]] : null;
        })->filter()->values()->toArray();
        $Items = Item::where(['status' => "Active"])->get()->map(function($item)use($item_groups){ return Arr::has($item_groups,$item->id) ? array_merge($item->only(['id','name','detail','image']),['groups' => $item_groups[$item->id]]) : null; })->filter()->values()->toArray();
        return compact('Groups','Items','Seats','Prices');
    }

    private static function ClassName($item){
        return Str::replaceLast('Model',ucfirst($item),Model::class);
    }

    public function records($table,Request $request){
        $ids = $request->input('ids');
        $ids = is_array($ids) ? $ids : [$ids]; $key = $request->input('key','id');
        return [$table => DB::table($table)->whereIn($key,$ids)->get()];
    }

}
