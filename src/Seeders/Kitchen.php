<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\KitchenFactory;

class Kitchen extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 4;
    public function run()
    {
        KitchenFactory::times(self::$times)->create();
    }
}
