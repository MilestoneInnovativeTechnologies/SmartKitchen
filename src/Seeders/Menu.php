<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\MenuFactory;

class Menu extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 10;
    public function run()
    {
        $i = 0;
        $group_ids = \Milestone\SmartKitchen\Models\ItemGroup::pluck('id');
        while ($i++ < self::$times){
            $groups = $group_ids->random(rand(6,14))->toArray();
            MenuFactory::times(1)->state(compact('groups'))->create();
        }
    }
}
