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
            $table->unsignedBigInteger('duration')->default(0);
            $table->enum('active',['Y','N'])->default('Y');
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
