<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Note extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description'];

    public function notelists():BelongsToMany
    {
        return $this->belongsToMany(Notelist::class);
    }

    public function evernotetags():BelongsToMany
    {
        return $this->belongsToMany(Evernotetag::class);
    }
}
