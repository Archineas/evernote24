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
        $user = new User();
        $user->name = "Rooobert";
        $user->email = "rooobert@gmail.com";
        $user->save();

        $todos = Todo::all()->pluck('id');
        $user->todos()->sync($todos);
        $user->save();
    }
}
