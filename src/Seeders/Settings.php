<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\SettingsFactory;

class Settings extends Seeder
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
            SettingsFactory::times(self::$times)->state(compact('name','value'))->create();
    }
}
