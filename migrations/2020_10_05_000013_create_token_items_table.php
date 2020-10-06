<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTokenItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('token_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('token')->index();
            $table->unsignedBigInteger('user')->nullable();
            $table->unsignedBigInteger('item')->index();
            $table->unsignedSmallInteger('quantity')->default(1);
            $table->unsignedBigInteger('kitchen')->nullable();
            $table->enum('progress',['New','Accepted','Processing','Completed','Served','Cancelled'])->default('New');
            $table->unsignedInteger('delay')->default(0);
            $table->string('narration',512)->nullable();
            $table->json('progress_timing')->nullable();
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
        Schema::dropIfExists('token_items');
    }
}
