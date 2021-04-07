<?php

namespace Milestone\SmartKitchen\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Milestone\SmartKitchen\Models\Settings;

class SettingsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Settings::class;

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