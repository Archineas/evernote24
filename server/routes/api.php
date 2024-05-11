<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Notelists
Route::get('notelists', [\App\Http\Controllers\NotelistController::class,'index']);
Route::get('notelists/search/{searchTerm}', [\App\Http\Controllers\NotelistController::class,'findBySearchTerm']);
Route::post('notelists', [\App\Http\Controllers\NotelistController::class,'saveNotelist']);
Route::put('notelists/{id}', [\App\Http\Controllers\NotelistController::class, 'update']);
Route::delete('notelists/{id}', [\App\Http\Controllers\NotelistController::class, 'delete']);


//Notes
Route::get('notes', [\App\Http\Controllers\NoteController::class,'index']);
Route::post('notes', [\App\Http\Controllers\NoteController::class,'saveNote']);
Route::put('notes/{id}', [\App\Http\Controllers\NoteController::class, 'update']);
Route::delete('notes/{id}', [\App\Http\Controllers\NoteController::class, 'delete']);

//Todos
Route::get('todos', [\App\Http\Controllers\TodoController::class,'index']);
Route::post('todos', [\App\Http\Controllers\TodoController::class,'saveTodo']);
Route::put('todos/{id}', [\App\Http\Controllers\TodoController::class, 'update']);
Route::delete('todos/{id}', [\App\Http\Controllers\TodoController::class, 'delete']);

//Evernotetags
Route::get('evernotetags', [\App\Http\Controllers\EvernotetagController::class,'index']);
Route::post('evernotetags', [\App\Http\Controllers\EvernotetagController::class,'saveEvernotetag']);
Route::put('evernotetags/{id}', [\App\Http\Controllers\EvernotetagController::class, 'update']);
Route::delete('evernotetags/{id}', [\App\Http\Controllers\EvernotetagController::class, 'delete']);
