<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Models\Menu;
use Milestone\SmartKitchen\Models\UserLogin;

class MenuController extends Controller
{
    public function toggle(Request $request){
        $id = intval($request->input('menu')); $user = auth()->id();
        if(!UserLogin::where(['user' => $user, 'out' => 0])->exists()) {
            Log::warning('Trying to set menu of user which not exists in UserLogin.. User: ' . $user);
            return;
        }
        $menus = [];
        UserLogin::where(['user' => $user, 'out' => 0])->each(function($log) use($id,&$menus){
            $section = $log->section; if(!array_key_exists('menu',$section)) $section['menu'] = [];
            if(!in_array($id,$section['menu'])){
                array_push($section['menu'],$id);
                $log->section = $section; $log->save();
                $menus = array_merge($menus,$section['menu']);
            } else {
                $section['menu'] = array_values(array_diff($section['menu'],[$id]));
                $log->section = $section; $log->save();
                $menus = array_merge($menus,$section['menu']);
            }
        });
        return array_values(array_unique($menus));
    }

    public static function data(){
        return request(['name','detail','groups','status']);
    }

    public static function create(){
        $item = new Menu(self::data()); $item->save();
        return $item;
    }

    public function manage(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = Menu::find(request()->input('id'));
        $item->update(self::data());
        return $item->fresh();
    }

}
