<?php

namespace Milestone\SmartKitchen;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Milestone\SmartKitchen\Listeners\Subscribers;

class SmartKitchenEventServiceProvider extends ServiceProvider
{

    protected $subscribe = [
        Subscribers::class,
    ];

}
