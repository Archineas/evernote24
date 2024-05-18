<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Note;
use App\Models\Notelist;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DateTime;
use Illuminate\Support\Facades\DB;

class NotelistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notelist = new Notelist();
        $notelist->title = '1) FH Todo';
        $notelist->description = 'HÜ und Lernliste';
        $notelist->save(); //in DB speichern

        $notelist2 = new Notelist();
        $notelist2->title = '2) Einkaufen';
        $notelist2->description = 'Lebensmittel usw.';
        $notelist2->save(); //in DB speichern

        $notelist3 = new Notelist();
        $notelist3->title = '3) Filme';
        $notelist3->description = 'Liste aller Filme, die ich noch gerne schaun würde';
        $notelist3->save(); //in DB speichern

        $notelist4 = new Notelist();
        $notelist4->title = '4) Bücher';
        $notelist4->description = 'Liste aller Lieblingsbücher';
        $notelist4->save(); //in DB speichern


        //Add Images to notelists
        $image1 = new Image();
        $image1->url = 'https://picsum.photos/200';
        $image1->title ='Bild1';

        $image2 = new Image();
        $image2->url = 'https://picsum.photos/200';
        $image2->title ='Bild2';

        $image3 = new Image();
        $image3->url = 'https://picsum.photos/200';
        $image3->title ='Bild3';

        $image4 = new Image();
        $image4->url = 'https://picsum.photos/200';
        $image4->title ='Bild4';

        $notelist->images()->saveMany([$image1]);
        $notelist->save();

        $notelist2->images()->saveMany([$image2]);
        $notelist2->save();

        $notelist3->images()->saveMany([$image3]);
        $notelist3->save();

        $notelist4->images()->saveMany([$image4]);
        $notelist4->save();

        //Add users
        $users = User::all()->pluck('id');
        $notelist->users()->sync($users);
        $notelist->save();

        //add Notes
        $note = Note::find(1);
        $notelist->notes()->attach($note);
        $notelist->save();

        $note2 = Note::find(2);
        $notelist2->notes()->attach($note2);
        $notelist2->save();

        $note3 = Note::find(3);
        $notelist3->notes()->attach($note3);
        $notelist3->save();

        $note4 = Note::find(4);
        $notelist4->notes()->attach($note4);
        $notelist4->save();

        //add Todos
        $todos = Todo::find(2);
        $notelist->todos()->attach($todos);
        $notelist->save();

        $todos2 = Todo::find(3);
        $notelist2->todos()->attach($todos2);
        $notelist2->save();

    }
}
