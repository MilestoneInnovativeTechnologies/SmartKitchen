<?php

namespace Milestone\SmartKitchen\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Milestone\SmartKitchen\Models\Bill;

class BillFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Bill::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
        ];
    }
}
