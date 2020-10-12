<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenStatus;
use Milestone\SmartKitchen\Models\Model;
use Milestone\SmartKitchen\Models\UserLogin;

class ChefLogOut implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $chef = null;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($chef)
    {
        $this->chef = $chef;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if($this->chef){
            KitchenStatus::whereJsonContains('users',intval($this->chef))->orWhereJsonContains('users',strval($this->chef))->get()->each(function($kitchenStatus){
                $kitchenStatus->users = array_diff($kitchenStatus->users,[$this->chef]);
                $kitchenStatus->save();
            });
        }
    }
}
