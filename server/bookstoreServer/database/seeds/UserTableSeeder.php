<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'TestUserHelper',
            'email' => 'test@test.at',
            'password' => bcrypt('123'),
            'isHelper' => true,
            'street' => 'Teststraße',
            'streetnumber' => 7,
            'zipcode' => 6175,
            'city' => 'Kematen',
        ]);

        DB::table('users')->insert([
            'name' => 'TestUser',
            'email' => 'test@test.work',
            'password' => bcrypt('123'),
            'isHelper' => false,
            'street' => 'Hinteregasse',
            'streetnumber' => 79,
            'zipcode' => 4020,
            'city' => 'Linz',
        ]);
    }


}
