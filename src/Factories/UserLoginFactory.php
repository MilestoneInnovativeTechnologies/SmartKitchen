<?php

namespace Milestone\SmartKitchen\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Milestone\SmartKitchen\Models\UserLogin;

class UserLoginFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = UserLogin::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = \Milestone\SmartKitchen\Models\User::whereIn('role',['Waiter','Chef'])->pluck('id');
        $in = $this->faker->unixTime(time()-(30*24*60*60));
        $out = $in + (rand(3,8)*60*60);
        return [
            'user'  =>  $users->random(),
            'in'    =>  $in,
            'out'   =>  $out,
        ];
    }
}
