<?php

namespace App\Http\Controllers;

use App\Models\Evernotetag;
use App\Models\Note;
use App\Models\Notelist;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Exception;

class EvernotetagController extends Controller
{
    //Get all Tags
    public function index():JsonResponse
    {
        $tags = Evernotetag::with(['notes','todos'])->get();
        return response()->json($tags, 200);
    }

    public function saveEvernotetag(Request $request):JsonResponse
    {
        DB::beginTransaction();
        try {
            $tag = Evernotetag::create($request->all());

            //save note
            if(isset($request['notes']) && is_array($request['notes'])){
                foreach ($request['notes'] as $noteEnt){
                    $note = Note::firstOrNew(['title'=>$noteEnt['title'], 'description'=>$noteEnt['description']]);
                    $tag->notes()->save($note);
                }
            }

            //save todos
            if(isset($request['todos']) && is_array($request['todos'])){
                foreach ($request['todos'] as $todoEnt){
                    $todo = Todo::firstOrNew(['title'=>$todoEnt['title'], 'description'=>$todoEnt['description'],
                        'deadline'=>$todoEnt['deadline']]);
                    $tag->todos()->save($todo);
                }
            }

            DB::commit();
            return response()->json($tag, 200);

        }catch (Exception $exception){
            DB::rollBack();
            return response()->json("Saving Evernotetag failed: " . $exception->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id):JsonResponse
    {
        DB::beginTransaction();
        try {
            $tag = Evernotetag::with(['notes','todos'])->where('id', $id)->first();
            if($tag!=null){
                $tag->update($request->all());

                //update notes und todos?
//                if(isset($request['evernotetags']) && is_array($request['evernotetags'])){
//                    $tag_ids = [];
//                    foreach ($request['evernotetags'] as $evernotetag){
//                        array_push($tag_ids, $evernotetag['id']);
//                    }
//                    $tag->evernotetags()->sync($tag_ids);
//                    $tag->save();
//                }
            }
            DB::commit();
            $tagUpdated = Evernotetag::with(['notes','todos'])->where('id', $id)->first();
            return response()->json($tagUpdated, 200);
        }catch (\Exception $e){
            DB::rollBack();
            return response()->json("Updating Evernotetag failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(string $id):JsonResponse
    {
        $tag = Evernotetag::where('id',$id)->first();
        if($tag!=null){
            $tag->delete();
            return response()->json('Evernotetag mit ID ' . $id . ' erfolgreich gelöscht', 200);
        }else{
            return response()->json('Evernotetag mit ID ' . $id . ' konnte nicht gelöscht werden', 422);
        }
    }
}
