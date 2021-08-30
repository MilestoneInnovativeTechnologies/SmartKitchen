<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Settings;

class SettingsController extends Controller
{

    public static function data(){
        return request(['name','value']);
    }

    public static function create(){
        $item = new Settings(self::data()); $item->save();
        return $item;
    }

    public function manage(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = Settings::find(request()->input('id'));
        $item->update(self::data());
        return $item->fresh();
    }

    public function delete(){
        if(!request()->has('id') || !request()->filled('id')) return [];
        Settings::destroy(request()->input('id'));
        Settings::orderBy('id','desc')->first()->touch();
        return request()->input('id');
    }

}
