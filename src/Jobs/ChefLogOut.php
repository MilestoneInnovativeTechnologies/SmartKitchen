<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\Kitchen;
use Milestone\SmartKitchen\Models\KitchenStatus;
use Milestone\SmartKitchen\Models\Remote;
use Milestone\SmartKitchen\Models\User;

class ChefLogOut
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $chef = null;

    public function __construct(User $chef) {
        $this->chef = $chef;
    }

    public function handle() {
        $chef = $this->chef->id; $rKs = Remote::where('item','kitchen')->pluck('local_id')->toArray();
        $Orm = KitchenStatus::whereNotIn('kitchen',$rKs)->where(function($query) use($chef){
            $query->whereJsonContains('users',strval($chef))->orWhereJsonContains('users',intval($chef));
        });
        if($Orm->exists()) $Orm->each(function($ks)use($chef){
            $users = $ks->users; $chefs = array_values(array_unique(array_diff($users,[$chef])));
            $ks->users = $chefs; $ks->save(); Log::info("Chef: $chef Logged Out from Kitchen: {$ks->kitchen}");
        });
        else Log::info("Logging out Chef: $chef, No Kitchens");
    }
}
