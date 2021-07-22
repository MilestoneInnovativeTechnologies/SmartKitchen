<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Remote;

class RemoteAddKitchen
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $id, $location;

    public function __construct($id,$location = null){
        $this->id = $id;
        $this->location = $location;
    }

    public function handle(){
        $where = ['item' => 'kitchens','local_id' => $this->id];
        if($this->location) $where['location'] = $this->location;
        Remote::updateOrCreate($where,['monitor' => 'Yes']);
    }
}
