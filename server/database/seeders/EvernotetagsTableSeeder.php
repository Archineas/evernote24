<?php

namespace Database\Seeders;

use App\Models\Evernotetag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EvernotetagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $evernotetag1 = new Evernotetag();
        $evernotetag1->name = "mein erstes Evernotetag!";
        $evernotetag1->save();

        $evernotetag2 = new Evernotetag();
        $evernotetag2->name = "mein zweites Evernotetag!";
        $evernotetag2->save();
    }
}
