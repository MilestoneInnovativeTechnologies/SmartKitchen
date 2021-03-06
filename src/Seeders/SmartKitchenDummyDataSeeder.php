<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;

class SmartKitchenDummyDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            User::class,
            Settings::class,
            UserLogin::class,
            ItemProp::class,
            Item::class,
            ItemGroup::class,
            Menu::class,
            PriceList::class,
            Price::class,
            Tax::class,
            Kitchen::class,
            KitchenItem::class,
            KitchenStatus::class,
            Customer::class,
            Seating::class,
            Token::class,
            TokenItem::class,
            Bill::class,
            Payment::class,
            Remote::class,
        ]);
    }
}
