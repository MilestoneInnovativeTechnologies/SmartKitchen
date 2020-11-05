<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\ItemGroupFactory;

class ItemGroup extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 15;
    public function run()
    {
        ItemGroupFactory::times(self::$times)->create();
    }
}
