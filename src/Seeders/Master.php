<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\MasterFactory;

class Master extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 1;

    private static $data = [
        'company'   => 'MIT Restaurant',
        'location'  => 'MITWISMAPAM1',
    ];
    public function run()
    {
        foreach (self::$data as $name => $value)
            MasterFactory::times(self::$times)->state(compact('name','value'))->create();
    }
}
