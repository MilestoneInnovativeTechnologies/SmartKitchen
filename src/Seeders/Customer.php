<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\CustomerFactory;

class Customer extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 220;
    public function run()
    {
        CustomerFactory::times(self::$times)->create();
    }
}
