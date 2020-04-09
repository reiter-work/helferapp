<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShoppinglistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shoppinglists', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->integer('user_id')->unsigned()->index();
        $table->string('title');
        $table->date('dueDate');
        $table->timestamps();
        //TODO: bills and Feedback/Comments

    });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shoppinglists');
    }
}
