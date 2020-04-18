<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserTableSeeder::class);
        $this->call(ShoppingListTableSeeder::class);
        $this->call(ItemTableSeeder::class);
        $this->call(CommentTableSeeder::class);

    }
}
