<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\ItemPropFactory;

class ItemProp extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 1;
    public function run()
    {
        ItemPropFactory::times(self::$times)->create();
    }
}
