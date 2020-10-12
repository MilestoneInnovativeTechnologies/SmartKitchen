<?php

namespace Milestone\SmartKitchen;

use Illuminate\Support\ServiceProvider;
use Milestone\SmartKitchen\Models\Model;

class SmartKitchenServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */

    private static array $configs = ['sk','filesystems.disks','logging.channels','auth.providers'];

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
            self::publishConfigs();
        }
        Model::unguard();
    }

    private static function path(...$path){
        return implode(DIRECTORY_SEPARATOR, [__DIR__,'..',...$path]);
    }

    private function mergeConfigs(){
        foreach (self::$configs as $config)
            $this->mergeConfigFrom(self::path('config',"$config.php"), $config);
        config(['auth.guards.web.provider' => 'smart_kitchen']);
    }

    private function publishConfigs(){
        $this->publishes([
            self::path('config','sk.php') => config_path('sk.php'),
        ]);
    }

    private function loadMigrations(){
        $this->loadMigrationsFrom(self::path('migrations'));
    }

}
