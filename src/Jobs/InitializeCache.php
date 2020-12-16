<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class InitializeCache
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(){
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(){
        cache()->put(ck(),'2000-01-01 00:00:01',now()->addDays(7));
    }
}
