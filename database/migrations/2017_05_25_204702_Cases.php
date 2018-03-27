<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Cases extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('caseimages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('imageurl', 1000)->nullable();
            $table->nullableTimestamps();
            $table->softDeletes();
        });

        Schema::create('cases', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->integer('userid')->unsigned();
            $table->integer('opened')->default(0);
            $table->integer('caseimageid')->unsigned();

            $table->nullableTimestamps();
            $table->softDeletes();

            $table->foreign('caseimageid')->references('id')->on('caseimages');
            $table->foreign('userid')->references('id')->on('users');
        });

        Schema::create('case_has_items', function (Blueprint $table) {
            $table->integer('CaseID')->unsigned();
            $table->integer('ItemID')->unsigned();

            $table->foreign('CaseID')->references('id')->on('cases');
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
        Schema::drop('caseimages');
        Schema::drop('cases');
        Schema::drop('case_has_items');
    }
}
