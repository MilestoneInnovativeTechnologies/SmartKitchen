<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Remote;

class RemoteAddToken
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $token, $location;

    public function __construct($token,$location){
        $this->token = $token;
        $this->location = $location;
    }

    public function handle(){
        $where = ['item' => 'tokens', 'local_id' => $this->token];
        if ($this->location) $where['location'] = $this->location;
        Remote::updateOrCreate($where, ['monitor' => 'Yes']);
    }
}
