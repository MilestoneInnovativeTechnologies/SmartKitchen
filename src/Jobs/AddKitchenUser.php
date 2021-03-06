<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Events\KitchenStatusCreated;
use Milestone\SmartKitchen\Events\KitchenStatusCreating;
use Milestone\SmartKitchen\Models\KitchenStatus;

class AddKitchenUser
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $chef, $kitchens;

    public function __construct($user, $kitchen){
        $this->chef = is_array($user) ? $user : ( is_object($user) ? [intval($user->id)] : [intval($user)]);
        $this->kitchens = is_array($kitchen) ? $kitchen : [intval($kitchen)];
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $kitchens = $this->kitchens; $chef = $this->chef;
        if($kitchens && $chef){
            foreach ($kitchens as $kitchen){
                if(!$kitchen) continue;
                if(!KitchenStatus::where(compact('kitchen'))->exists()) {
                    KitchenStatusCreating::dispatch($kitchen,$chef);
                    KitchenStatus::create(['kitchen' => $kitchen, 'users' => $chef]);
                    KitchenStatusCreated::dispatch($kitchen,$chef);
                    Log::info('Kitchen status inserted for kitchen: ' . $kitchen);
                } else {
                    $Kitchen = KitchenStatus::where('kitchen',$kitchen)->first();
                    $users = array_map('intval',array_values(array_unique(array_merge(Arr::get($Kitchen,'Users',[]) ?: [],$chef))));
                    $Kitchen->update(compact('users'));
                    Log::info('Kitchen: ' . $kitchen . ', Users: ' . implode(', ',$users));
                }
            }
        }
    }
}
