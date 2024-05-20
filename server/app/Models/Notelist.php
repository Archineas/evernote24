<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Notelist extends Model
{
    use HasFactory;

    //hier müssen dann auch noch note_id und todo_id hinzugefügt werden!
    protected $fillable = ['title', 'description', 'note_id', 'todo_id']; //alles angeben, was gesetzt werden können soll - zB id, created_at nicht!

    //Namenskonvention mit dem "scope" - wird innerhalb von Abfragen benutzt
    public function scopeDescription($query)
    {
        //im Tinker dann noch mit ->get() aufrufen!
        return $query->where('description', '!=', "");
    }

    //eine Notelist hat many Images
    //wenn man eine Notelist aus DB holt, dann mit ->images() die Bilder holen, als Funktion
    public function images():HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function users():BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function notes():BelongsToMany
    {
        return $this->belongsToMany(Note::class)->with(['evernotetags']);
    }

    public function todos():BelongsToMany
    {
        return $this->belongsToMany(Todo::class)->with(['evernotetags']);
    }
}
