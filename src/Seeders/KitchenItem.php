<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\KitchenItemFactory;

class KitchenItem extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 25;
    public function run()
    {
        $all_items = collect([]);
        foreach(\Milestone\SmartKitchen\Models\Kitchen::pluck('id')->toArray() as $kitchen){
            $all_items = $all_items->count() ? $all_items : \Milestone\SmartKitchen\Models\Item::pluck('id');
            $items = $all_items->splice(0,rand(9,self::$times));
            foreach ($items as $item)
                KitchenItemFactory::times(1)->state(compact('kitchen','item'))->create();
        }

    }
}
