<?php

namespace App\Http\Controllers;

use App\Models\Evernotetag;
use App\Models\Notelist;
use App\Models\Todo;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Exception;

class TodoController extends Controller
{
    //Get all Todos
    public function index():JsonResponse
    {
        $todos = Todo::with(['users','evernotetags','notelists'])->get();
        return response()->json($todos, 200);
    }

    public function findById(string $id):JsonResponse
    {
        $todo = Todo::where('id', $id)
            ->with(['users','evernotetags','notelists'])->first();
        return $todo != null ? response()->json($todo, 200) : response()->json(null, 200);
    }

    public function saveTodo(Request $request):JsonResponse
    {
        DB::beginTransaction();
        try {
            $deadline = Carbon::parse($request->deadline)->toDateTimeString();

            $todo = Todo::create([
                'title' => $request->title,
                'description' => $request->description,
                'deadline' => $deadline, // Formatiertes Datum einfügen
            ]);

            //save user
            if(isset($request['users']) && is_array($request['users'])){
                foreach ($request['users'] as $usr){
                    $user = User::firstOrNew(['name'=>$usr['name'],'email'=>$usr['email']]);
                    $todo->users()->save($user);
                }
            }

            //save evernotetags
            if(isset($request['evernotetags']) && is_array($request['evernotetags'])){
                foreach ($request['evernotetags'] as $evernotetag){
                    $tag = Evernotetag::firstOrNew(['name'=>$evernotetag['name']]);
                    $todo->evernotetags()->save($tag);
                }
            }

            //save notelist
            if(isset($request['notelists']) && is_array($request['notelists'])){
                foreach ($request['notelists'] as $ntlist){
                    $notelist = Notelist::firstOrNew(['id'=>$ntlist['id']]);
                    $todo->notelists()->save($notelist);
                }
            }

            DB::commit();
            return response()->json($todo, 200);

        }catch (Exception $exception){
            DB::rollBack();
            return response()->json("Saving Todo failed: " . $exception->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id):JsonResponse
    {
        DB::beginTransaction();
        try {
            $todo = Todo::with(['users','evernotetags','notelists'])->where('id', $id)->first();
            if($todo!=null){

                $deadline = Carbon::parse($request->deadline)->toDateTimeString();
                $todo->update([
                    'title' => $request->title,
                    'description' => $request->description,
                    'deadline' => $deadline, // Formatiertes Datum einfügen
                ]);

                //update evernotetags
                if(isset($request['evernotetags']) && is_array($request['evernotetags'])){
                    $tag_ids = [];
                    foreach ($request['evernotetags'] as $evernotetag){
                        array_push($tag_ids, $evernotetag['id']);
                    }
                    $todo->evernotetags()->sync($tag_ids);
                    $todo->save();
                }
            }
            DB::commit();
            $todoUpdated = Todo::with(['evernotetags'])->where('id', $id)->first();
            return response()->json($todoUpdated, 200);
        }catch (\Exception $e){
            DB::rollBack();
            return response()->json("Updating Todo failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(string $id):JsonResponse
    {
        $todo = Todo::where('id',$id)->first();
        if($todo!=null){
            $todo->delete();
            return response()->json('Todo mit ID ' . $id . ' erfolgreich gelöscht', 200);
        }else{
            return response()->json('Todo mit ID ' . $id . ' konnte nicht gelöscht werden', 422);
        }
    }
}
