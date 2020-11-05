<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\UserFactory;

class User extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 10;
    public function run()
    {
        foreach (['Administrator','Receptionist','Waiter','Chef','Management'] as $role)
            UserFactory::times(self::$times)->state(compact('role'))->create();
    }
}
