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
            $table->char('pin',4)->index()->nullable()->unique()->after('name');
            $table->enum('role',array_keys(config('sk.role_names')))->index()->default('Waiter')->after('password');
            $table->dropUnique(['email']);
        });

        \Milestone\SmartKitchen\Models\User::create(['name' => 'Administrator','pin' => '0000','login' => 'admin','email' => 'admin@' . config('sk.domain'),'password' => 'password', 'role' => 'Administrator', 'email_verified_at' => now()->toDateTimeString()]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['login','role','pin']);
            $table->unique('email');
        });
    }
}
