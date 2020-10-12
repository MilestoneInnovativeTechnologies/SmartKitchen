<?php

namespace Milestone\SmartKitchen\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Milestone\SmartKitchen\Models\UserLogin;

class LogIn implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user, $in, $section;

    /**
     * Create a new job instance.
     *
     * @param null $user
     * @param null $time
     * @param null $section
     */
    public function __construct($section = null) {
        $this->user = Auth::user()->id; $role = Auth::user()->role; $key = config("sk.login_log_section_role_key.$role");
        $this->in = time();
        $this->section = $section ? [$key => [intval($section)]] : null;
        Log::info("Login log adding for user id: $this->user, role: $role, $key: $section");
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if($this->user && $this->in) {
            $login = new UserLogin(['user' => $this->user, 'in' => $this->in]);
            if($this->section) $login->section = $this->section;
            $login->save();
        }
    }
}
