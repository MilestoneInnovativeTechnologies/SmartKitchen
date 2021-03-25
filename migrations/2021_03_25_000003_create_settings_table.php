<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('name',64)->index();
            $table->string('value',4096)->nullable();
            $table->timestamps();
        });

        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'Company', 'value' => '']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'Location', 'value' => '']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'Printer 01', 'value' => '']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'Printer 02', 'value' => '']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'kot_print_template', 'value' => '[["[id]","size3|center"],["Type:[type]|Time:[time_human]","around"],["Waiter:[user.name]|Seat:[seating.name]","around"],["","feed"],["items#Details:[quantity]x [item.name]|Narration:[narration]", "table"],["Qunatity: [total_quantities]|Items: [total_items]","around"]]']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'bill_print_template', 'value' => '[["Bill: [id]|Date: [date_human2]","around"],["Type: [token.type]|Time: [time_human]","around"],["Customer: [customer.name]"],["Waiter: [token.user.name]"],["","feed"],["contents#Item:[quantity]x [name]|Rate:[price_precise]|Amnt:[amount_precise]","table|index",null,"Amnt"],["Sub Total:|[amount_precise]","around|emphasis"],["Discount :|[discount_precise]","around|emphasis"],["=","line"],["[payable_precise]","center|size2|emphasis"],["=","line"],["Accepts Cash,Card,PayTM,GPay,PhonePe","center"],["[id]|[payable_number]","upi|center"]]']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'payment_print_template', 'value' => '[["Bill Payments","center|emphasis|underline"],["Bill: [id]|Date: [date_human2]","around"],["Type: [token.type]|Time: [time_human]","around"],["Customer: [customer.name]"],["","feed"],["contents#Item:[quantity]x [name]|Rate:[price_precise]|Amnt:[amount_precise]","table|index",null,"Amnt"],["Sub Total:|[amount_precise]","around"],["Discount :|[discount_precise]","around"],["-","line"],["[payable_precise]","right|emphasis"],["Inclusive Taxes","emphasis|underline"],["taxes#Tax:[name]|%:[percent]%|Taxable:[taxable]|Tax Amount:[tax]","table|index",null,["Taxable","Tax Amount"]],["Total Taxable|[taxes_taxable]","around"],["Total Tax Amount|[taxes_amount]","around"],["-","line"],["","feed"],["Payments","emphasis|underline"],["payments#Date:[date_time]|Type:[type]|Remarks:[detail]|Amount:[amount_precise]","table|index",null,["Amount"]],["Total Paid|[paid_precise]","around|emphasis"],["=","line"],["[paid_precise]","center|size2|emphasis"],["=","line"],["Thank you very much for your business, Kindly remember us in need!!","center"]]']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'kot_printer', 'value' => 'Printer 01']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'bill_printer', 'value' => 'Printer 02']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'payment_printer', 'value' => '']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
