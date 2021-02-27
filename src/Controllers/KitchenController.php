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

    public static function data(){
        return request(['name','detail','auto_accept','cloud','location','ref','server','status']);
    }

    public static function create(){
        $item = new Kitchen(self::data()); $item->save();
        return $item;
    }

    public function manage(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = Kitchen::find(request()->input('id'));
        $item->update(self::data());
        return $item->fresh();
    }

    public function items(){
        $now = now()->toDateTimeString();
        if(!request()->has('kitchen') || !request()->filled('kitchen')) return ['removes' => [],'updates' => []];
        $kitchen = request()->input('kitchen');
        $remove = request()->input('removes');
        if($remove) KitchenItem::where('kitchen',$kitchen)->whereIn('item',$remove)->delete();
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
}
