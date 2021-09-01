<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Jobs\AddKitchenUser;
use Milestone\SmartKitchen\Jobs\ToggleKitchenUser;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\KitchenStatus;
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
        } elseif($request->has('delete')) {
            $kitchen_item = KitchenItem::find($request->input('delete'));
            if($kitchen_item) {
                $aKI = KitchenItem::where(['kitchen' => $kitchen_item->kitchen])->first();
                $kitchen_item->delete();
                if($aKI) $aKI->update(['updated_at' => now()->toDateTimeString()]);
            }
            return 1;
        }
        return [];
    }

    public function toggle(Request $request){
        $kitchen = intval($request->input('kitchen')); $user = auth()->id();
        if(!UserLogin::where(['user' => $user, 'out' => 0])->exists()) {
            Log::warning('Trying to set kitchen of chef which not exists in UserLogin.. User: ' . $user);
            return null;
        }
        $kitchens = []; $full_time = KitchenStatus::where('full_timer',$user)->pluck('kitchen')->toArray();
        UserLogin::where(['user' => $user, 'out' => 0])->each(function($log) use($kitchen,&$kitchens,$full_time){
            $section = $log->section; if(!array_key_exists('kitchen',$section)) $section['kitchen'] = [];
            if(!empty($kitchens)){
                $section['kitchen'] = $kitchens;
            } else {
                $section['kitchen'] = array_merge($section['kitchen'],$full_time);
                if(!in_array($kitchen,$section['kitchen'])) array_push($section['kitchen'],$kitchen);
                elseif(!in_array($kitchen,$full_time)){
                    $section['kitchen'] = array_diff($section['kitchen'],[$kitchen]);
                }
                $section['kitchen'] = array_values(array_unique($section['kitchen']));
                $kitchens = $section['kitchen'];
            }
            $log->section = $section; $log->save();
        });
        ToggleKitchenUser::dispatch($kitchen,$user);
        return array_values(array_unique($kitchens));
    }

    public function auto(Request $request){
        $id = $request->input('id'); $auto_accept = $request->input('auto_accept');
        $kitchen = Kitchen::find($id); if($kitchen) $kitchen->update(compact('auto_accept'));
        return Arr::get($kitchen,'auto_accept','No');
    }

    public static function data(){
        return request(['name','detail','auto_accept','cloud','status']);
    }

    public static function create(){
        $item = new Kitchen(self::data()); $item->save();
        return $item;
    }

    public function manage(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = Kitchen::find(request()->input('id'));
        $item->update(self::data());
        $status_updates = ['full_timer','printer'];
        if(request()->hasAny($status_updates)){ KitchenStatus::where('kitchen',request()->input('id'))->first()->update(request()->only($status_updates)); }
        return $item->fresh();
    }

    public function items(){
        $now = now()->toDateTimeString();
        if(!request()->has('kitchen') || !request()->filled('kitchen')) return ['removes' => [],'updates' => []];
        $kitchen = request()->input('kitchen');
        $remove = request()->input('removes');
        if($remove) KitchenItem::where('kitchen',$kitchen)->whereIn('item',$remove)->get()->each->delete();
        $items = request()->input('updates');
        if($items) {
            KitchenItem::where('kitchen',$kitchen)->get()->each(function($ki) use(&$items){
                if(array_key_exists($ki->item,$items)){
                    $ki->update($items[$ki->item]);
                    unset($items[$ki->item]);
                }
            });
        }
        if($items){
            $Kitchen = Kitchen::find($kitchen);
            foreach ($items as $item => $details)
                $Kitchen->Items()->create($details);
        }
        return ['removes' => $remove,'updates' => KitchenItem::where('updated_at','>=',$now)->get()->toArray()];
    }

    public function full_timer(Request $request){
        $keys = ['user','kitchen','status'];
        if(!$request->filled($keys)) return null;
        $req = $request->only($keys); $full_timer = $req['status'] ? $req['user'] : null;
        KitchenStatus::where(['kitchen' => $request->kitchen])->get()->each(function($status,$idx)use($full_timer){
            if($idx) $status->delete();
            else $status->update(compact('full_timer'));
        });
        return $req['status'] ? $req['kitchen'] : null;
    }

    public function items_all(Request $request){
        if(request()->has('kitchen') && request()->filled('kitchen'))
            KitchenItem::where($request->only(['kitchen']))->update([$request->item => $request->process]);
        return [];
    }
}
