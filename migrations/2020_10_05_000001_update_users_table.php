<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('email',64)->nullable()->change();
            $table->string('login',24)->index()->unique()->after('name');
            $table->enum('role',['Administrator','Management','Receptionist','Waiter','Chef'])->index()->default('Waiter')->after('password');
            $table->dropUnique(['email']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['login','role']);
            $table->unique('email');
        });
    }
}
