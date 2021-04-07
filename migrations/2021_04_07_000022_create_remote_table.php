<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRemoteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('remote', function (Blueprint $table) {
            $table->id();
            $table->string('item','32')->index();
            $table->unsignedBigInteger('local_id')->index();
            $table->unsignedBigInteger('remote_id')->nullable()->index();
            $table->char('location',32)->nullable()->index();
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
        Schema::dropIfExists('remote');
    }
}
