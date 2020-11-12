<?php

namespace Milestone\SmartKitchen\Seeders;

use Illuminate\Database\Seeder;
use Milestone\SmartKitchen\Factories\TaxFactory;

class Tax extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static $times = 0;

    private static $contents = [
        'VAT5%' => [
            ['name' => 'VAT5%','nature' => null,'percent' => 5],
            ['name' => 'Flood Ces 1 %','nature' => 'Kerala Customer','percent' => 1],
        ],
        'VAT5 & Service 15%' => [
            ['name' => 'VAT5%','nature' => null,'percent' => 5],
            ['name' => 'Flood Ces 1 %','nature' => 'Kerala Customer','percent' => 1],
            ['name' => 'VAT Service 15%','nature' => null, 'percent' => 15],
        ],
        'GST5%' => [
            ['name' => 'CGST2.5%','nature' => 'Kerala Customer','percent' => 25],
            ['name' => 'SGST2.5%','nature' => 'Kerala Customer','percent' => 25],
            ['name' => 'CGST2.5%','nature' => 'Non Kerala Customer','percent' => 25],
            ['name' => 'SGST2.5%','nature' => 'Non Kerala Customer','percent' => 25],
            ['name' => 'IGST5%','nature' => 'Business','percent' => 5],
            ['name' => 'Flood Cess 1%','nature' => 'Kerala Customer','percent' => 1],
        ],
        'GST12%' => [
            ['name' => 'CGST6%','nature' => 'Kerala Customer','percent' => 6],
            ['name' => 'SGST6%','nature' => 'Kerala Customer','percent' => 6],
            ['name' => 'CGST6%','nature' => 'Non Kerala Customer','percent' => 6],
            ['name' => 'SGST6%','nature' => 'Non Kerala Customer','percent' => 6],
            ['name' => 'IGST12%','nature' => 'Business','percent' => 12],
            ['name' => 'Flood Cess 1%','nature' => 'Kerala Customer','percent' => 1],
        ],
        'GST18%' => [
            ['name' => 'CGST9%','nature' => 'Kerala Customer','percent' => 9],
            ['name' => 'SGST9%','nature' => 'Kerala Customer','percent' => 9],
            ['name' => 'CGST9%','nature' => 'Non Kerala Customer','percent' => 9],
            ['name' => 'SGST9%','nature' => 'Non Kerala Customer','percent' => 9],
            ['name' => 'IGST18%','nature' => 'Business','percent' => 18],
            ['name' => 'Flood Cess 1%','nature' => 'Kerala Customer','percent' => 1],
        ],
        'GST28%' => [
            ['name' => 'CGST14%','nature' => 'Kerala Customer','percent' => 14],
            ['name' => 'SGST14%','nature' => 'Kerala Customer','percent' => 14],
            ['name' => 'CGST14%','nature' => 'Non Kerala Customer','percent' => 14],
            ['name' => 'SGST14%','nature' => 'Non Kerala Customer','percent' => 14],
            ['name' => 'IGST28%','nature' => 'Business','percent' => 28],
            ['name' => 'Flood Cess 1%','nature' => 'Kerala Customer','percent' => 1],
        ]
    ];

    public function run()
    {
        $items_master = \Milestone\SmartKitchen\Models\Item::pluck('id')->toArray();
        $length = floor(count($items_master)/count(self::$contents)); $i = 0-$length;
        foreach (self::$contents as $name => $contents){
            $items = array_slice($items_master,$i+=$length,$length);
            TaxFactory::times(1)->state(compact('items','name','contents'))->create();
        }
    }
}
