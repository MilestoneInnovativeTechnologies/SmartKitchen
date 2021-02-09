<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\RemoteItemFactory;

class RemoteItem extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 0;
    public function run()
    {
        RemoteItemFactory::times(self::$times)->create();
    }
}
