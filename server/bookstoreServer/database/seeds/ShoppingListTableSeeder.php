<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;

class ShoppingListTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        for($i = 0; $i < 5; $i++){

            DB::table('shoppinglists')->insert([
                'title' => Str::random(8),
                'dueDate' => Carbon::now()->toDateTimeString(),
                'user_id' => 1,
            ]);
        }
    }
}
