<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Image extends Model
{
    use HasFactory;

    protected $fillable = ['url', 'title']; //von außen über REST das setzen können

    //ein Image gehört zu einer Notelist
    public function notelist():BelongsTo
    {
        return $this->belongsTo(Notelist::class);
    }

    public function todos():BelongsToMany
    {
        return $this->belongsToMany(Todo::class);
    }
}
