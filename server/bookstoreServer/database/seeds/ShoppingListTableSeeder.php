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

        $faker = Faker\Factory::create();

        for($i = 0; $i < 5; $i++){

            DB::table('shoppinglists')->insert([
                'title' => $faker->word,
                'dueDate' => $faker->dateTimeBetween($startDate = 'now', $endDate = '+2 months'),
                'created_at' => $faker->dateTime('now'),
                'updated_at' => $faker->dateTimeBetween($startDate = 'now', $endDate = '+2 months'),
                'user_id' => rand(1,2),
                'helper_id' => null,
            ]);
        }
    }
}
