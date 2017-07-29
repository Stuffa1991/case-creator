<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Item extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('price', function (Blueprint $table) {
            $table->increments('id');
            $table->string('market_name')->nullable();
            $table->string('market_hash_name')->nullable();
            $table->string('type')->nullable();
            $table->decimal('price')->nullable();
            $table->string('imageurl', 1000)->nullable();
            $table->string('quality_color')->nullable();
            $table->string('name_color')->nullable();
            $table->nullableTimestamps();
            $table->softDeletes();
        });

        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('priceid')->unsigned();
            $table->foreign('priceid')->references('id')->on('price');
            $table->decimal('percentage')->nullable();
        });

        Schema::create('user_has_items', function (Blueprint $table) {
            $table->integer('UserID')->unsigned();
            $table->integer('ItemID')->unsigned();

            $table->foreign('UserID')->references('id')->on('users');
            $table->foreign('ItemID')->references('id')->on('items');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('price');
        Schema::drop('items');
        Schema::drop('user_has_items');
    }
}
