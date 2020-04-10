<?php

use Illuminate\Database\Seeder;

class CommentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for($i = 0; $i < 15; $i++){

            $shoppingList = DB::table('shoppinglists')->orderByRaw("RAND()")->first();

            DB::table('comments')->insert([
                'comment' => $faker->sentence,
                'shoppinglist_id' => $shoppingList->id,
                'user_id' => rand(1,2),
            ]);
        }
    }
}
