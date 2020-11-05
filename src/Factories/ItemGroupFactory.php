<?php

namespace Milestone\SmartKitchen\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Milestone\SmartKitchen\Models\Item;
use Milestone\SmartKitchen\Models\ItemGroup;

class ItemGroupFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ItemGroup::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $items = Item::pluck('id');
        return [
            'name'  =>  $this->faker->name,
            'detail'=>  $this->faker->text,
            'items'=>  json_encode($items->random(random_int(6,20))->toArray()),
        ];
    }
}
