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

        //add Tags
        $tags = Evernotetag::all()->pluck('id');
        $note->evernotetags()->sync($tags);
        $note->save();
    }
}
