<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\KitchenStatus;
use Milestone\SmartKitchen\Models\User;

class ChefLogOut
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $chef = null;

    public function __construct(User $chef) {
        $this->chef = $chef;
    }

    public function handle() {
        $chef = $this->chef->id;
        if(!KitchenStatus::whereJsonContains('Users',strval($chef))->orWhereJsonContains('Users',intval($chef))->exists())
            return Log::info("Logging out Chef: $chef, No Kitchens");
        KitchenStatus::whereJsonContains('Users',strval($chef))->orWhereJsonContains('Users',intval($chef))->each(function($ks)use($chef){
            $users = $ks->users; $chefs = array_values(array_unique(array_diff($users,[$chef])));
            $ks->users = $chefs; $ks->save(); Log::info("Chef: $chef Logged Out from Kitchen: {$ks->kitchen}");
        });
    }
}
