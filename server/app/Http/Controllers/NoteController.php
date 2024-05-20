<?php

namespace App\Http\Controllers;

use App\Models\Evernotetag;
use App\Models\Note;
use App\Models\Notelist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Exception;

class NoteController extends Controller
{
    //Get all Notes
    public function index():JsonResponse
    {
        $notes = Note::with(['notelists','evernotetags'])->get();
        return response()->json($notes, 200);
    }

    public function findById(string $id):JsonResponse
    {
        $note = Note::where('id', $id)
            ->with(['notelists','evernotetags'])->first();
        return $note != null ? response()->json($note, 200) : response()->json(null, 200);
    }

    public function saveNote(Request $request):JsonResponse
    {
        DB::beginTransaction();
        try {
            $note = Note::create($request->all());

            //save notelist
            if(isset($request['notelists']) && is_array($request['notelists'])){
                foreach ($request['notelists'] as $ntlist){
                    //$notelist = Notelist::firstOrNew(['title'=>$ntlist['title'],'description'=>$ntlist['description']]);
                    $notelist = Notelist::firstOrNew(['id'=>$ntlist['id']]);
                    $note->notelists()->save($notelist);
                }
            }

            //save evernotetags
            if(isset($request['evernotetags']) && is_array($request['evernotetags'])){
                foreach ($request['evernotetags'] as $evernotetag){
                    $tag = Evernotetag::firstOrNew(['name'=>$evernotetag['name']]);
                    $note->evernotetags()->save($tag);
                }
            }

            DB::commit();
            return response()->json($note, 200);

        }catch (Exception $exception){
            DB::rollBack();
            return response()->json("Saving Note failed: " . $exception->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id):JsonResponse
    {
        DB::beginTransaction();
        try {
            $note = Note::with(['evernotetags'])->where('id', $id)->first();
            if($note!=null){
                $note->update($request->all());

                //update evernotetags
                if(isset($request['evernotetags']) && is_array($request['evernotetags'])){
                    $tag_ids = [];
                    foreach ($request['evernotetags'] as $evernotetag){
                        array_push($tag_ids, $evernotetag['id']);
                    }
                    $note->evernotetags()->sync($tag_ids);
                    $note->save();
                }

            }
            DB::commit();
            $noteUpdated = Note::with(['evernotetags'])->where('id', $id)->first();
            return response()->json($noteUpdated, 200);
        }catch (\Exception $e){
            DB::rollBack();
            return response()->json("Updating Note failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(string $id):JsonResponse
    {
        $note = Note::where('id',$id)->first();
        if($note!=null){
            $note->delete();
            return response()->json('Note mit ID ' . $id . ' erfolgreich gelöscht', 200);
        }else{
            return response()->json('Note mit ID ' . $id . ' konnte nicht gelöscht werden', 422);
        }
    }
}
