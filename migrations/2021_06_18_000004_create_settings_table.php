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

        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'company', 'value' => '']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'location', 'value' => '']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'Printer01', 'value' => '']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'Printer02', 'value' => '/dev/usb/lp0']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'kot_printer', 'value' => 'Printer01']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'kot_print_template', 'value' => '[["[id]","size3|center"],["Type:[type]|Time:[time_human]","around"],["Waiter:[user.name]|Seat:[seating.name]","around"],["","feed"],["items#Details:[quantity]x [item.name]|Narration:[narration]", "table"],["Qunatity: [total_quantities]|Items: [total_items]","around"]]']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'token_printer', 'value' => 'Printer01']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'token_print_template', 'value' => '[["Token Details","center|underline"],["ID  : [id]|[date_human]","around"],["Type: [type]|[time_human]","around"],["","feed"],["Customer: [customer.name]"],["User: [user.name]"],["","feed"],["items#Item:[quantity]x [item.name]|Rate:[price_precise]|Amt:[amount_precise]","table|index",null,["Rate","Amt"]],["[items_amount_precise]","center|size2|emphasis"],["-","line"],["[id]|[items_amount]","upi|center|big"],["","feed"],["We accepts payment through upi, scan above code using any upi app to make payment","center"]]']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'bill_printer', 'value' => 'Printer01']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'bill_print_template', 'value' => '[["Bill Details","center|emphasis|underline"],["Bill: [bill.id]|[bill.date_human]","around"],["Type: [type]|[bill.time_human]","around"],["Token: [id]"],["","feed"],["Customer: [customer.name]"],["          [customer.phone]"],["User: [user.name]"],["","feed"],["bill.contents#Item:[quantity]x [name]|Rate:[price_precise]|Amt:[amount_precise]","table|index",null,["Rate","Amt"]],["Sub Total:|[bill.amount_precise]","around|emphasis"],["Discount :|[bill.discount_precise]","around|emphasis"],["=","line"],["[bill.payable_precise]","center|size2|emphasis"],["=","line"],["","feed"],["Tax Nature: [bill.nature]"],["bill.tax_amounts#Name:[name]|Taxable:[taxable_precise]|Tax:[amount_precise]","table",null,["Taxable","Tax"]],["Total Taxable|[bill.total_taxable_precise]","around"],["Total Tax|[bill.total_tax_precise]","around"],["","feed"],["Payments","underline"],["bill.payments#Date:[date_human]|Type:[type]|Amount:[amount_precise]","table|index",null,"Amount"],["Paid: [bill.paid_precise]","title"],["-","line"],["Accepts Cash,Card,PayTM,GPay,PhonePe","center"],["","feed"],["[id]|[bill.balance]","upi|center"]]']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'payment_printer', 'value' => 'Printer01']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'payment_print_template', 'value' => '[["Payment Details","center|underline"],["Pay ID: [id]|[date_human]","around"],["Bill #: [token.bill.id]|[time_human]","around"],["Payment Type: [type]"],["Customer: [token.customer.name]"],["          [token.customer.phone]"],["=","line"],["[amount_precise]","title"],["=","line"],["","feed"],["Bill Amount: [token.bill.payable_precise]"],["Bill Date: [token.bill.date_human] [token.bill.time_human]"],["","feed"],["token.bill.payments#Date:[date_human]|Type:[type]|Amt:[amount_precise]","table|index",null,"Amt"],["Total Paid|[token.bill.paid_precise]","around|center|emphasis"],["Balance|[token.bill.balance_precise]","around|center|emphasis"],["=","line"],["Thanks for the payment !!","center"]]']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'sale_printer', 'value' => 'Printer01']);
        \Milestone\SmartKitchen\Models\Settings::create(['name' => 'sale_print_template', 'value' => '[["Sales Details","center|underline|emphasis"],["Sale: [id]|[date_human]","around"],["Bill: [bill.id]|[time_human]","around"],["","feed"],["Customer: [customer.name]"],["          [customer.phone]"],["","feed"],["items#Item:[quantity]x [item.name]|Rate:[price_precise]|Amt:[amount_precise]","table|index"],["Sub Total:|[bill.amount_precise]","around|emphasis"],["Discount :|[bill.discount_precise]","around|emphasis"],["=","line"],["[bill.payable_precise]","center|size2|emphasis"],["=","line"],["","feed"],["Tax Nature: [bill.nature]"],["bill.tax_amounts#Name:[name]|Taxable:[taxable_precise]|Amt:[amount_precise]","table",null,["Taxable","Amt"]],["Total Taxable|[bill.total_taxable_precise]","around"],["Total Tax|[bill.total_tax_precise]","around"],["","feed"],["Payments","underline"],["bill.payments#Type:[type]|Amount:[amount_precise]","table|index",null,"Amount"],["Paid: [bill.paid_precise]","title"],["-","line"],["Thanks for your business.. See you soon :)","center"]]']);
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
