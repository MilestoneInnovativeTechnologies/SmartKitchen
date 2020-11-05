<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Milestone\SmartKitchen\Models\User;

class UserLoggedIn
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user, $in, $section;

    public function __construct(User $user, $in, $section){
        $this->user = $user;
        $this->in = $in;
        $this->section = $section;
    }

    public function handle(){
        if(!$this->user) return;
        $user = $this->user; $in = $this->in ?: time();
        $key = config("sk.login_log_section_role_key.{$user->role}");
        $section = $this->section ? [$key => [intval($this->section)]] : [];
        $lg = $this->section ? ", $key: {$this->section}" : '';
        Log::info("Login log adding for user id: {$user->id}, role: {$user->role}$lg");
        $user->Log()->save(new \Milestone\SmartKitchen\Models\UserLogin(compact('in','section')));
    }
}
