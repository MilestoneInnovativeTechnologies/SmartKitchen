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

    private static array $configs = ['filesystems.disks'];

    public function register()
    {
        $this->mergeConfigs();
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        if($this->app->runningInConsole()){
            self::loadMigrations();
        }
    }

    private static function path(...$path){
        return implode(DIRECTORY_SEPARATOR, [__DIR__,'..',...$path]);
    }

    private function mergeConfigs(){
        foreach (self::$configs as $config)
            $this->mergeConfigFrom(self::path('config',"$config.php"), $config);
    }

    private function loadMigrations(){
        $this->loadMigrationsFrom(self::path('migrations'));
    }

}
