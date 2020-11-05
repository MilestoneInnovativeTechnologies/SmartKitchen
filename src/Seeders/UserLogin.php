<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\UserLoginFactory;

class UserLogin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 0;
    public function run()
    {
        UserLoginFactory::times(self::$times)->create();
    }
}
