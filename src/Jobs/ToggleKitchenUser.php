<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Events\KitchenStatusUpdated;
use Milestone\SmartKitchen\Events\KitchenStatusUpdating;
use Milestone\SmartKitchen\Models\KitchenStatus;

class ToggleKitchenUser
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $chef, $kitchen;

    public function __construct($kitchen,$user){
        $this->chef = $user;
        $this->kitchen = $kitchen;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $kitchen = $this->kitchen; $chef = intval($this->chef);
        if($kitchen && $chef){
            if(!KitchenStatus::where('kitchen',$kitchen)->exists()) KitchenStatus::create(['kitchen' => $kitchen, 'users' => []]);
            $ks = KitchenStatus::where('kitchen',$kitchen)->first();
            $chefs = Arr::get($ks,'users',[]);
            if(in_array($chef,$chefs)) $chefs = array_values(array_unique(array_diff($chefs,[$chef])));
            else array_push($chefs,$chef);
            KitchenStatusUpdating::dispatch($kitchen,$chef);
            $ks->users = $chefs; $ks->save();
            KitchenStatusUpdated::dispatch($kitchen,$chef);
        }
    }
}
