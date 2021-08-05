<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tokens', function (Blueprint $table) {
            $table->id();
            $table->enum('type',['Dining','Home Delivery','Take Away','Remote','Sale','Other'])->default('Dining');
            $table->unsignedBigInteger('seating')->nullable();
            $table->timestamp('date')->default(\Illuminate\Support\Facades\DB::raw('CURRENT_TIMESTAMP'));
            $table->unsignedBigInteger('price_list');
            $table->unsignedBigInteger('user')->nullable();
            $table->unsignedBigInteger('customer')->nullable();
            $table->string('narration',1024)->nullable();
            $table->enum('progress',['New','Processing','Completed','Billed','Cancelled'])->default('New');
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
        Schema::dropIfExists('tokens');
    }
}
