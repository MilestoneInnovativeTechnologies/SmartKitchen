<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\SeatingFactory;

class Seating extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 22;
    public function run()
    {
        $start = 0;
        for ($i = 0; $i < self::$times; $i++){
            $seats = json_encode(range(++$start,$start += rand(1,8)));
            SeatingFactory::times(1)->state(compact('seats'))->create();
        }
    }
}
