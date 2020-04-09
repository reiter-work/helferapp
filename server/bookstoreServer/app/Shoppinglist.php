<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Shoppinglist extends Model
{

    protected $fillable = [
        'title',
        'dueDate',
    ];

    public function items() : HasMany
    {
        return $this->hasMany(Item::class);
    }
}
