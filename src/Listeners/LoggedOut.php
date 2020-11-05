<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\ChefLogOut;
use Milestone\SmartKitchen\Jobs\UserLogOut;

class LoggedOut
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(\Milestone\SmartKitchen\Events\LoggedOut $event)
    {
        $user = $event->user;
        UserLogOut::dispatch($user);
        if ($user->role === 'Chef') ChefLogOut::dispatch($user)->afterResponse();
    }

}
