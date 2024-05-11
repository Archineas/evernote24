<?php

namespace Database\Seeders;

use App\Models\Evernotetag;
use App\Models\Todo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;

class TodosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $todo = new Todo();
        $todo->title = "Erstes Todo!";
        $todo->description = "Die Beschreibung des ersten Todos!";
        $todo->save();

        //add Tags
        $tags = Evernotetag::all()->pluck('id');
        $todo->evernotetags()->sync($tags);
        $todo->save();
    }
}
