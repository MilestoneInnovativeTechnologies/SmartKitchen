<?php

namespace Milestone\SmartKitchen\Server;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\KitchenStatus;
use Milestone\SmartKitchen\Models\Remote;

class KitchenController extends Controller
{

    public static $Create = 'basic';
    public static $Params = [
        'awake' => ['Kitchen@id' => ['name','detail','auto_accept','cloud','status']],
        'basic' => ['Kitchen@id' => '*'],
        'status' => ['KitchenStatus@kitchen' => '*'],
        'item_details' => ['[KitchenItems]' => '*'],
        'items' => ['KitchenItem@kitchen' => '*'],
    ];

    public static function fresh(){
        return ['basic','status','item_details','items'];
    }

    public function awake($id,$attrs){
        Kitchen::where('id',$id)->update($attrs[0]);
    }

    public function basic($id,$attrs){
        $local_id = Arr::get(Remote::where(['item' => 'kitchen', 'location' => LOCATION, 'remote_id' => $id])->first(),'local_id');
        $attrs = array_merge(Arr::except($attrs[0],['id','created_at','updated_at','image']),['location' => LOCATION]);
        if($local_id) Kitchen::find($local_id)->update($attrs);
        else self::remote(Kitchen::create($attrs)->id);
    }

    public function status($id,$attrs){
        $users = Arr::get($attrs[0],'users');
        KitchenStatus::updateOrCreate(['kitchen' => $id],['users' => $users]);
    }

    public function item_details($id,$items){
        $product_ids = array_column($items,'id');
        $local_ids = Remote::where(['item' => 'item', 'location' => LOCATION])->whereIn('remote_id',$product_ids)->pluck('local_id','remote_id')->toArray();
        foreach ($items as $product){
            $remote_id = $product['id']; $item = 'item';
            $attrs = Arr::except($product,['id','created_at','updated_at','image','props']);
            if(Arr::has($local_ids,$remote_id)){
                Item::where('id',Arr::get($local_ids,$remote_id))->update($attrs);
            } else {
                $local = Item::create($attrs);
                self::remote($local->id,$item,$remote_id);
            }
        }
    }

    public function items($kitchen,$rows){
        $itemKeys = Remote::where(['item' => 'item', 'location' => LOCATION])->pluck('local_id','remote_id')->toArray();
        $active = [];
        foreach ($rows as $row){
            $item = Arr::get($itemKeys,$row['item']); if(!$item) continue; $active[] = $item;
            KitchenItem::updateOrCreate(compact('kitchen','item'),Arr::only($row,['stock','duration','auto_process','auto_complete','status']));
        }
        $inactive = array_diff($itemKeys,$active);
        KitchenItem::where(compact('kitchen'))->whereIn('item',$inactive)->get()->each->delete();
    }

    public function KitchenItems($id){
        return Item::whereHas('Kitchens',function($Q) use($id){ $Q->where('kitchen',$id); })->get();
    }

}
