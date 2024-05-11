<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'deadline'];

    public function notelists():BelongsToMany
    {
        return $this->belongsToMany(Notelist::class);
    }

    public function users():BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function images():BelongsToMany
    {
        return $this->belongsToMany(Image::class);
    }

    public function evernotetags():BelongsToMany
    {
        return $this->belongsToMany(Evernotetag::class);
    }
}
