<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSyncsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('syncs', function (Blueprint $table) {
            $table->id();
            $table->string('item',128)->index();
            $table->string('item_id',128)->index();
            $table->string('method',128);
            $table->enum('progress',['New','Preparing','Processing','Completed'])->default('New');
            $table->timestamp('time')->default(\Illuminate\Support\Facades\DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
            $table->json('timing')->nullable();
            $table->enum('status',['New','Done','Failed'])->default('New');
            $table->tinyInteger('retry')->default(0);
            $table->string('response',1024)->nullable();
            $table->json('extra')->nullable();
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
        Schema::dropIfExists('syncs');
    }
}
