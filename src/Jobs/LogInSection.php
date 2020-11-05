<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Milestone\SmartKitchen\Models\User;
use Milestone\SmartKitchen\Models\UserLogin;

class LogInSection implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $userLogin;

    /**
     * Create a new job instance.
     *
     * @param UserLoggedIn $userLogin
     */
    public function __construct(UserLogin $userLogin)
    {
        $this->userLogin = $userLogin;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $userLogin = $this->userLogin;
        $role = Arr::get(User::find($userLogin->user),'role');
        if($role !== 'Chef' || !$userLogin->section) return;
        $kitchens = Arr::get($userLogin->section,config('sk.login_log_section_role_key.Chef'));
        AddKitchenUser::dispatch($kitchens,$userLogin->user);
    }
}
