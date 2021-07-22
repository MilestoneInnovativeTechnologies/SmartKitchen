<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Remote;

class RemoteDeleteKitchenItem
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $ki;

    public function __construct($ki){
        $this->ki = $ki;
    }

    public function handle(){
        Remote::where(['local_id' => $this->ki, 'item' => 'kitchen_items'])->update(['monitor' => 'No']);
    }
}
