<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\PriceFactory;

class Price extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 10;
    public function run()
    {
        $items = \Milestone\SmartKitchen\Models\Item::pluck('id')->toArray();
        foreach (\Milestone\SmartKitchen\Models\PriceList::pluck('id')->toArray() as $price_list){
            foreach ($items as $item){
                PriceFactory::times(1)->state(compact('price_list','item'))->create();
            }
        }
    }
}
