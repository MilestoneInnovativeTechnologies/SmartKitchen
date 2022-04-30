<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Model;
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
        Settings::where('name','_deleted_')->delete();
        Settings::find(request()->input('id'))->update(['name' => '_deleted_']);
        return request()->input('id');
    }

    public function file_upload(Request $request){
        if(request()->filled('name') && request()->hasFile('file')) {
            $value = request()->file('file')->store('uploads');
            $name = '_file_' . request('name');
            $settings = new Settings(compact('name','value')); $settings->save();
            return $settings;
        }
        return null;
    }
    public function file_remove(){
        if(!\request()->filled('id')) return null;
        $setting = Settings::find(\request('id'));
        if($setting){
            Storage::delete($setting->value);
            $setting->delete();
            Settings::orderBy('id','desc')->first()->touch();
        }
        return $setting;
    }

}
