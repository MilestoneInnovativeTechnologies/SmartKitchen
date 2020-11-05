<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\ModelFactory;

class Model extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 10;
    public function run()
    {
        ModelFactory::times(self::$times)->create();
    }
}
