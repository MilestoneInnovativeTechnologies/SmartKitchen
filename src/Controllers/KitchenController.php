<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Jobs\AddKitchenUser;
use Milestone\SmartKitchen\Jobs\ToggleKitchenUser;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\UserLogin;

class KitchenController extends Controller
{
    public function item(Request $request){
        $ki_data = $request->only(['item','stock','duration','auto_process','auto_complete']);
        if($request->has('kitchen')){
            $kitchen = Kitchen::find($request->input('kitchen'));
            $kitchen_item = new KitchenItem($ki_data);
            $kitchen->Items()->save($kitchen_item);
            return KitchenItem::where(['kitchen' => $request->input('kitchen'), 'item' => $ki_data['item']])->first();
        } elseif($request->has('id')) {
            $kitchen_item = KitchenItem::find($request->input('id'));
            $kitchen_item->update($ki_data);
            return $kitchen_item;
        }
        return [];
    }

    public function toggle(Request $request){
        $id = intval($request->input('kitchen')); $user = auth()->id();
        if(!UserLogin::where(['user' => $user, 'out' => 0])->exists()) {
            Log::warning('Trying to set kitchen of chef which not exists in UserLogin.. User: ' . $user);
            return;
        }
        $kitchens = [];
        UserLogin::where(['user' => $user, 'out' => 0])->each(function($log) use($id,&$kitchens){
            $section = $log->section; if(!array_key_exists('kitchen',$section)) $section['kitchen'] = [];
            if(!in_array($id,$section['kitchen'])){
                array_push($section['kitchen'],$id);
                $log->section = $section; $log->save();
                $kitchens = array_merge($kitchens,$section['kitchen']);
            } else {
                $section['kitchen'] = array_values(array_diff($section['kitchen'],[$id]));
                $log->section = $section; $log->save();
                $kitchens = array_merge($kitchens,$section['kitchen']);
            }
        });
        ToggleKitchenUser::dispatch($id,$user);
        return array_values(array_unique($kitchens));
    }

    public function auto(Request $request){
        $id = $request->input('id'); $auto_accept = $request->input('auto_accept');
        $kitchen = Kitchen::find($id); if($kitchen) $kitchen->update(compact('auto_accept'));
        return Arr::get($kitchen,'auto_accept','No');
    }
}
