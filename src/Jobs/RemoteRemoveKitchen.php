<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Remote;

class RemoteRemoveKitchen
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $id, $location;

    public function __construct($id){
        $this->id = $id;
    }

    public function handle(){
        $where = ['item' => 'kitchens','local_id' => $this->id];
        Remote::updateOrCreate($where,['monitor' => 'No']);
    }
}
