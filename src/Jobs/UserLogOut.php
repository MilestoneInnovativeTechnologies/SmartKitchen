<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\User;

class UserLogOut
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;

    public function __construct(User $user){
        $this->user = $user;
    }

    public function handle(){
        $user = $this->user;
        if ($user->Logs()->where('out', 0)->exists()) {
            $user->Logs()->where('out', 0)->update(['out' => time()]);
            Log::info('Logged out user logs!! User ID: ' . $user->id);
        }
    }
}
