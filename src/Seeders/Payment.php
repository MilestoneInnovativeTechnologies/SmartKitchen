<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\PaymentFactory;

class Payment extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 0;
    public function run()
    {
        PaymentFactory::times(self::$times)->create();
    }
}
