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
        $evernotetag1->name = "Hat noch Zeit";
        $evernotetag1->save();

        $evernotetag2 = new Evernotetag();
        $evernotetag2->name = "Dringend";
        $evernotetag2->save();

        $evernotetag3 = new Evernotetag();
        $evernotetag3->name = "Der Hut brennt";
        $evernotetag3->save();
    }
}
