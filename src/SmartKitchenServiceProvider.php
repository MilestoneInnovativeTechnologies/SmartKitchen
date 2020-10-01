<?php

namespace Milestone\SmartKitchen;

use Illuminate\Support\ServiceProvider;

class SmartKitchenServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        dd('I am Okey');
    }
}
