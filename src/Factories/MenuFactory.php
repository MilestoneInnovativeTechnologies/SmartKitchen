<?php

namespace Milestone\SmartKitchen\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Milestone\SmartKitchen\Models\Menu;

class MenuFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Menu::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        return [
            'name'      =>  $this->faker->lastName,
            'detail'    =>  $this->faker->sentence(10),
        ];
    }
}
