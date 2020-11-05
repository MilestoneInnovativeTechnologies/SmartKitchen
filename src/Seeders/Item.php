<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\ItemFactory;

class Item extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 300;
    public function run()
    {
        ItemFactory::times(self::$times)->create();
    }
}
