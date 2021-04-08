<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\RemoteFactory;

class Remote extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 0;
    public function run()
    {
        RemoteFactory::times(self::$times)->create();
    }
}
