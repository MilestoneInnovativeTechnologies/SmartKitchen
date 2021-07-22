<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name',256)->index();
            $table->string('detail',1024)->nullable();
            $table->string('prop1',191)->nullable()->index();
            $table->string('prop2',191)->nullable()->index();
            $table->string('prop3',191)->nullable()->index();
            $table->string('prop4',191)->nullable()->index();
            $table->string('prop5',191)->nullable()->index();
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
        Schema::dropIfExists('items');
    }
}
