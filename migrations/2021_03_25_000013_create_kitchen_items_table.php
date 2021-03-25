<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKitchenItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kitchen_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kitchen')->index();
            $table->unsignedBigInteger('item')->index();
            $table->decimal('stock')->default(0);
            $table->unsignedBigInteger('duration')->default(0);
            $table->enum('auto_process',['No','Yes'])->default('No');
            $table->enum('auto_complete',['No','Yes'])->default('No');
            $table->enum('status',['Active','Inactive'])->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kitchen_items');
    }
}
