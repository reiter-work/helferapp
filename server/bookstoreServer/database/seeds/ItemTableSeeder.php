<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        for($i = 0; $i < 25; $i++){

            $shoppingList = DB::table('shoppinglists')->orderByRaw("RAND()")->first();

            DB::table('items')->insert([
                'title' => Str::random(8),
                'price' => rand(1, 29),
                'shoppinglistId' => $shoppingList->id,
             ]);
        }




    }
}
