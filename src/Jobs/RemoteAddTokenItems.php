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
use Milestone\SmartKitchen\Models\Token;
use Milestone\SmartKitchen\Models\TokenItem;

class RemoteAddTokenItems
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $token, $location;

    public function __construct($token,$location){
        $this->token = $token;
        $this->location = $location;
    }

    public function handle(){
        $TokenItems = TokenItem::with('Item')->where('token',$this->token)->get();
        $Remotes = Remote::where('item','token_items')->pluck('local_id')->toArray();
        $TokenItems->map(function($TokenItem)use($Remotes){
            $id = $TokenItem->id;
            return (in_array($id,$Remotes)) ? false : $id;
        })->each(function($tokenItem){
            if(!$tokenItem) return;
            $data = ['item' => 'token_items','local_id' => $tokenItem, 'monitor' => 'Yes'];
            if($this->location) $data['location'] = $this->location;
            Remote::create($data);
        });
    }
}
