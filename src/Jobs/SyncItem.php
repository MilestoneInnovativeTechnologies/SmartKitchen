<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\Sync;
use Milestone\SmartKitchen\Server\ServerController;

class SyncItem implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $id, $sync;

    public function __construct($id){
        $this->id = $id;
        Sync::prepare($id);
    }

    public function handle(){
        Sync::process($this->id);
        $this->sync = $sync = Sync::find($this->id);
        $this->ProcessResponse(ServerController::response($sync->item,$sync->item_id,$sync->method));
    }

    private function ProcessResponse($response){
        Sync::complete($this->id,$response->successful(),$response->body());
        $data = $response->json(); $need = Arr::get($data,'need', null); $take = Arr::get($data,'take', null);
        if($need) ServerController::needSync($need);
    }
}
