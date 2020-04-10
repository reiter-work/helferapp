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

        $faker = Faker\Factory::create();

        for($i = 0; $i < 25; $i++){

            $shoppingList = DB::table('shoppinglists')->orderByRaw("RAND()")->first();

            DB::table('items')->insert([
                'title' => $faker->word,
                'price_max' => rand(1, 29),
                'shoppinglist_id' => $shoppingList->id,
                'isDone' => $faker->boolean,
             ]);
        }




    }
}
