<?php

namespace Milestone\SmartKitchen\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Milestone\SmartKitchen\Models\KitchenItem;

class KitchenItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = KitchenItem::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'duration'  =>  rand(0,5) * 60,
            'stock'     =>  rand(0,35)
        ];
    }
}
