<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\KitchenStatusFactory;

class KitchenStatus extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 0;
    public function run()
    {
        KitchenStatusFactory::times(self::$times)->create();
    }
}
