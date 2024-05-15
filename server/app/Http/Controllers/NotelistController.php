<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Note;
use App\Models\Notelist;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Exception;

class NotelistController extends Controller
{
    public function index():JsonResponse
    {
        $notelists = Notelist::with(['users','notes','todos','images'])->get();
        return response()->json($notelists, 200);
    }

    public function findBySearchTerm(string $searchTerm):JsonResponse
    {
        $notelists = Notelist::with(['users','notes','todos','images'])
            ->where('title','LIKE','%' . $searchTerm . '$')->get();
        return response()->json($notelists, 200);
    }

    public function findById(string $id):JsonResponse
    {
        $notelist = Notelist::where('id', $id)
            ->with(['users','notes','todos','images'])->first();
        return $notelist != null ? response()->json($notelist, 200) : response()->json(null, 200);
    }

    public function saveNotelist(Request $request):JsonResponse
    {
        DB::beginTransaction();
        try {
            $notelist = Notelist::create($request->all());

            //save user
            if(isset($request['users']) && is_array($request['users'])){
                foreach ($request['users'] as $usr){
                    $user = User::firstOrNew(['name'=>$usr['name'],'email'=>$usr['email']]);
                    $notelist->users()->save($user);
                }
            }

            //save note
            if(isset($request['notes']) && is_array($request['notes'])){
                foreach ($request['notes'] as $noteEnt){
                    $note = Note::firstOrNew(['title'=>$noteEnt['title'], 'description'=>$noteEnt['description']]);
                    $notelist->notes()->save($note);
                }
            }

            //save todos
            if(isset($request['todos']) && is_array($request['todos'])){
                foreach ($request['todos'] as $todoEnt){
                    $todo = Todo::firstOrNew(['title'=>$todoEnt['title'], 'description'=>$todoEnt['description'],
                        'deadline'=>$todoEnt['deadline']]);
                    $notelist->todos()->save($todo);
                }
            }

            //save image
            if(isset($request['images']) && is_array($request['images'])){
                foreach ($request['images'] as $imgEnt){
                    $image = Image::firstOrNew(['url'=>$imgEnt['url'],'title'=>$imgEnt['title']]);
                    $notelist->images()->save($image);
                }
            }

            DB::commit();
            return response()->json($notelist, 200);

        }catch (Exception $exception){
            DB::rollBack();
            return response()->json("Saving Notelist failed: " . $exception->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id):JsonResponse
    {
        DB::beginTransaction();
        try {
            $notelist = Notelist::with(['users','notes','todos','images'])->where('id', $id)->first();
            if($notelist!=null){
                $notelist->update($request->all());

                //update users
                if(isset($request['users']) && is_array($request['users'])){
                    $user_ids = [];
                    foreach ($request['users'] as $usr){
                       array_push($user_ids,$usr['id']);
                    }
                    $notelist->users()->sync($user_ids);
                    $notelist->save();
                }

                //update notes
                if(isset($request['notes']) && is_array($request['notes'])){
                    $note_ids = [];
                    foreach ($request['notes'] as $noteEnt){
                        array_push($note_ids, $noteEnt['id']);
                    }
                    $notelist->notes()->sync($note_ids);
                    $notelist->save();
                }

                //update todos
                if(isset($request['todos']) && is_array($request['todos'])){
                    $todo_ids = [];
                    foreach ($request['todos'] as $todoEnt){
                        array_push($todo_ids, $todoEnt['id']);
                    }
                    $notelist->todos()->sync($todo_ids);
                    $notelist->save();
                }

                //images
                $notelist->images()->delete();
                if(isset($request['images']) && is_array($request['images'])){
                    foreach ($request['images'] as $imgEnt){
                        $image = Image::firstOrNew(['url'=>$imgEnt['url'],'title'=>$imgEnt['title']]);
                        $notelist->images()->save($image);
                    }
                }
            }
            DB::commit();
            $notelistUpdated = Notelist::with(['users','notes','todos','images'])->where('id', $id)->first();
            return response()->json($notelistUpdated, 200);
        }catch (\Exception $e){
            DB::rollBack();
            return response()->json("Updating Notelist failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(string $id):JsonResponse
    {
        $notelist = Notelist::where('id',$id)->first();
        if($notelist!=null){
            $notelist->delete();
            return response()->json('Notelist mit ID ' . $id . ' erfolgreich gelöscht', 200);
        }else{
            return response()->json('Notelist mit ID ' . $id . ' konnte nicht gelöscht werden', 422);
        }
    }
}
