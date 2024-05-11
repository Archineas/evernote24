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
        $notelist->title = 'Generierte Liste 1';
        $notelist->description = 'erste im Seeder generierte Liste!';

        $notelist->save(); //in DB speichern

        //
        $notelist2 = new Notelist();
        $notelist2->title = 'Generierte Liste 2';
        $notelist2->description = 'zweite im Seeder generierte Liste!';
        $notelist2->save(); //in DB speichern

        $notelist3 = new Notelist();
        $notelist3->title = 'Generierte Liste 3';
        $notelist3->description = 'dritte im Seeder generierte Liste!';
        $notelist3->save(); //in DB speichern

        $notelist4 = new Notelist();
        $notelist4->title = 'Generierte Liste 4';
        $notelist4->description = 'vierte im Seeder generierte Liste!';
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

        $notelist->images()->saveMany([$image1,$image2]);
        $notelist->save();

        $notelist2->images()->saveMany([$image3,$image4]);
        $notelist2->save();

        //Add users
        $users = User::all()->pluck('id');
        $notelist->users()->sync($users);
        $notelist->save();

        //add Notes
        $notes = Note::all()->pluck('id');
        $notelist->notes()->sync($notes);
        $notelist->save();

        //add Todos
        $todos = Todo::all()->pluck('id');
        $notelist->todos()->sync($todos);
        $notelist->save();

    }
}
