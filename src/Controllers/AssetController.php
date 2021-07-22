<?php

namespace Milestone\SmartKitchen\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Model;

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
}
