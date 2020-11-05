<?php

namespace Milestone\SmartKitchen\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Milestone\SmartKitchen\Jobs\AddKitchenUser;
use Milestone\SmartKitchen\Jobs\UserLoggedIn;

class LoggedIn
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
    public function handle(\Milestone\SmartKitchen\Events\LoggedIn $event)
    {
        UserLoggedIn::dispatch($event->user, $event->in, $event->section);
        if($event->user->role === 'Chef') AddKitchenUser::dispatch($event->user, $event->section);
    }

}
