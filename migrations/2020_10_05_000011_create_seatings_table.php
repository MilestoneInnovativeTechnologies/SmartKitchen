<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeatingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seating', function (Blueprint $table) {
            $table->id();
            $table->string('name',256)->index();
            $table->string('detail',1024)->nullable();
            $table->unsignedBigInteger('price_list');
            $table->json('seats')->nullable();
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
        Schema::dropIfExists('seating');
    }
}
