<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\PriceListFactory;

class PriceList extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 3;
    public function run()
    {
        PriceListFactory::times(self::$times)->create();
    }
}
