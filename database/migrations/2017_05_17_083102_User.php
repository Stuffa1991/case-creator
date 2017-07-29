<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class User extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->nullable();
            $table->bigInteger('steamid64')->nullable();
            $table->string('trade_link')->nullable();
            $table->string('avatar')->nullable();
            $table->string('email')->nullable();
            $table->string('remember_token')->nullable();
            $table->decimal('balance')->default(0);
            $table->enum('role', ['user', 'support' , 'admin']);
            $table->nullableTimestamps();
            $table->softDeletes();
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');

            $table->enum('action', ['buy', 'sell' , 'deposit']);
            $table->decimal('amount')->default('0');

            $table->integer('userid')->unsigned();
            $table->foreign('userid')->references('id')->on('users');
            $table->nullableTimestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
        Schema::drop('transactions');
    }
}
