<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Remote;

class RemoteAddKitchenItem
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $ki, $location;

    public function __construct($ki,$location = null){
        $this->ki = $ki;
        $this->location = $location;
    }

    public function handle(){
        $where = ['item' => 'kitchen_items','local_id' => $this->ki];
        if($this->location) $where['location'] = $this->location;
        Remote::updateOrCreate($where,['monitor' => 'Yes']);
    }
}
