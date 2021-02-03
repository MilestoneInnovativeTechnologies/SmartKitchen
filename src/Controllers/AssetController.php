<?php

namespace Milestone\SmartKitchen\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Model;

class AssetController extends Controller
{

    public static function AssetRoute($model){
        $class = Str::of(Model::class)->replaceLast('Model',ucfirst($model))->__toString();
        $time = Carbon::parse($class::max('updated_at') ?? '2000-01-01 00:00:01')->unix();
        return route('asset',compact('time','model'));
    }

    public static function JSAsset($time,$model){
        $class = Str::of(Model::class)->replaceLast('Model',ucfirst($model))->__toString();
        return response('const _ASSET_' . ucfirst($model) . ' = ' . $class::all()->toJson())->withHeaders(['Content-Type' => 'text/javascript']);
    }
}
