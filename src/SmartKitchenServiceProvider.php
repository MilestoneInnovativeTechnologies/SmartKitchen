<?php

namespace Milestone\SmartKitchen;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use Milestone\SmartKitchen\Models\Model;

class SmartKitchenServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */

    private static $configs = ['sk','filesystems.disks','logging.channels','auth.providers','queue.connections','jwt','media-library'];

    public function register()
    {
        $this->mergeConfigs();
        self::setClient();
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
            self::publishAssets();
        } else {
            self::loadRoutes();
            self::loadViews();
        }
        Model::unguard();
    }

    private static function path(...$path){
        return implode(DIRECTORY_SEPARATOR, [__DIR__,'..',...$path]);
    }

    private function mergeConfigs(){
        foreach (self::$configs as $config)
            $this->mergeConfigFrom(self::path('config',"$config.php"), $config);
        config([
            'app.timezone'              =>  sk('timezone'),
            'auth.guards.web.provider'  =>  'smart_kitchen',
            'queue.default'             =>  'sk',
            'auth.defaults.guard'       =>  'api',
            'auth.guards.api.driver'    =>  'jwt',
            'auth.guards.api.provider'  =>  'smart_kitchen',
        ]);
        date_default_timezone_set(sk('timezone'));
    }

    private function publishConfigs(){ $this->publishes([self::path('config','sk.php') => config_path('sk.php')]); }
    private function publishAssets(){ $this->publishes([ self::path('assets') => public_path('/')]); }
    private function loadMigrations(){ $this->loadMigrationsFrom(self::path('migrations')); }
    private function loadViews(){ $this->loadViewsFrom(self::path('views'),'SK'); }
    private function loadRoutes(){ $this->loadRoutesFrom(self::path('routes/route.php')); }

    private static function setClient(){
        $host = request()->getHost(); $domain = config('sk.domain');
        $client = trim(str_ireplace($domain,'',$host),".");
        define('CLIENT',$client ?: null);
    }

}
