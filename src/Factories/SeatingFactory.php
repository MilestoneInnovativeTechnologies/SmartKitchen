<?php

namespace Milestone\SmartKitchen\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Milestone\SmartKitchen\Models\PriceList;
use Milestone\SmartKitchen\Models\Seating;

class SeatingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Seating::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $price_list = PriceList::pluck('id');
        return [
            'name'      =>  $this->faker->state,
            'detail'    =>  $this->faker->sentence(10),
            'price_list'=>  $price_list->random(),
        ];
    }
}
