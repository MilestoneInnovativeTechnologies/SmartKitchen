<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Milestone\SmartKitchen\Models\KitchenStatus;

class AddKitchenUser implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $kitchens, $chef;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($kitchens,$chef)
    {
        $this->kitchens = $kitchens;
        $this->chef = $chef;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if($this->kitchens && !empty($this->kitchens) && $this->chef){
            $chef = [$this->chef];
            foreach ($this->kitchens as $kitchen){
                if(!KitchenStatus::where(compact('kitchen'))->exists()) {
                    KitchenStatus::create(['kitchen' => $kitchen, 'users' => $chef]);
                    Log::info('Kitchen status inserted for kitchen: ' . $kitchen);
                } else {
                    $Kitchen = KitchenStatus::where('kitchen',$kitchen)->first();
                    $users = array_unique(array_merge(Arr::get($Kitchen,'users',[]) ?: [],$chef));
                    $Kitchen->update(compact('users'));
                    Log::info('Kitchen status users updated for kitchen: ' . $kitchen . ', users: ' . implode(', ',$users));
                }
            }
        }
    }
}
