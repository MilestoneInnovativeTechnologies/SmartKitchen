<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\KitchenItem;
use Milestone\SmartKitchen\Models\Remote;

class RemoteAddKitchenItems
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $kitchen, $location;

    public function __construct($kitchen,$location = null){
        $this->kitchen = $kitchen;
        $this->location = $location;
    }

    public function handle(){
        $RemoteKitchenReference = Arr::get(Remote::where(['item' => 'kitchens', 'local_id' => $this->kitchen])->orderBy('id','desc')->first(),'reference');
        if(!$RemoteKitchenReference) return;
        $KitchenItems = KitchenItem::with('Item')->where('kitchen',$this->kitchen)->get();
        $Remotes = Remote::where('item','kitchen_items')->pluck('local_id')->toArray();
        $KitchenItems->map(function($KitchenItem)use($Remotes){
            $id = $KitchenItem->id;
            return (in_array($id,$Remotes)) ? $id : false;
        })->each(function($kitchenItem){
            $where = ['item' => 'kitchen_items','local_id' => $kitchenItem];
            $update = ['monitor' => 'Yes'];
            if($this->location) $update['location'] = $this->location;
            if($kitchenItem) Remote::updateOrCreate($where,$update);
        });
    }
}
