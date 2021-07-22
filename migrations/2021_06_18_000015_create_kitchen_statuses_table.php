<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKitchenStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kitchen_statuses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kitchen')->index();
            $table->unsignedBigInteger('full_timer')->index()->nullable();
            $table->json('users')->nullable();
            $table->enum('status',['Active','Inactive'])->default('Inactive');
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
        Schema::dropIfExists('kitchen_statuses');
    }
}
