<?php

namespace Database\Seeders;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //test user standard
        $user = new User();
        $user->name = "Rooobert";
        $user->email = "rooobert@gmail.com";
        $user->role = "user";
        $user->password = bcrypt("robert");
        $user->save();

        //admin user
        $admin = new User();
        $admin->name = "admin";
        $admin->email = "admin@gmail.com";
        $admin->role = "admin";
        $admin->password = bcrypt("admin");
        $admin->save();
    }
}
