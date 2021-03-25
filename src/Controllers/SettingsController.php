<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Master;

class SettingsController extends Controller
{

    public static function data(){
        return request(['name','value']);
    }

    public static function create(){
        $item = new Master(self::data()); $item->save();
        return $item;
    }

    public function manage(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = Master::find(request()->input('id'));
        $item->update(self::data());
        return $item->fresh();
    }

}
