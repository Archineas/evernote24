<?php

namespace Database\Seeders;

use App\Models\Evernotetag;
use App\Models\Note;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $note = new Note();
        $note->title='Erste Notiz';
        $note->description='Die erste Notiz im Seeder!';
        $note->save();

        $note2 = new Note();
        $note2->title='Zweite Notiz';
        $note2->description='Die zweite Notiz im Seeder!';
        $note2->save();

        $note3 = new Note();
        $note3->title='Dritte Notiz';
        $note3->description='Die dritte Notiz im Seeder!';
        $note3->save();

        $note4 = new Note();
        $note4->title='Vierte Notiz';
        $note4->description='Die vierte Notiz im Seeder!';
        $note4->save();

        //add Tags
        $tag = Evernotetag::find(2);
        $note->evernotetags()->attach($tag);
        $note->save();

        $tag2 = Evernotetag::find(1);
        $note2->evernotetags()->attach($tag2);
        $note2->save();
    }
}
