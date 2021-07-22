<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRemotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('remotes', function (Blueprint $table) {
            $table->id();
            $table->string('item',32)->index();
            $table->unsignedBigInteger('local_id')->index();
            $table->string('reference',32)->index()->nullable();
            $table->char('location',16)->index();
            $table->json('extra')->nullable();
            $table->enum('monitor',['Yes','No'])->default('Yes');
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
        Schema::dropIfExists('remotes');
    }
}
