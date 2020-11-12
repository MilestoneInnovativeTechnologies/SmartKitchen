<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('token')->index();
            $table->unsignedBigInteger('user')->nullable();
            $table->unsignedBigInteger('customer')->index();
            $table->decimal('amount',9,3)->default(0);
            $table->decimal('discount',9,3)->default(0);
            $table->decimal('round',9,3)->default(0);
            $table->string('nature',64)->index()->nullable();
            $table->json('contents')->nullable();
            $table->enum('progress',['Pending','Partial','Paid','Cancelled'])->default('Pending');
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
        Schema::dropIfExists('bills');
    }
}
