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
        $todo->title = "Sport machen";
        $todo->description = "Todo außerhalb der Listen...";
        $todo->save();

        $todo2 = new Todo();
        $todo2->title = "Für AUP lernen";
        $todo2->description = "Zusammenfassen, lernen";
        $todo2->save();

        $todo3 = new Todo();
        $todo3->title = "Wandern gehn";
        $todo3->description = "Sehr lange";
        $todo3->save();

        //add Tags
        $tag = Evernotetag::find(3);
        $todo->evernotetags()->attach($tag);
        $todo->save();

        $tag2 = Evernotetag::find(2);
        $todo3->evernotetags()->attach($tag2);
        $todo3->save();
    }
}
