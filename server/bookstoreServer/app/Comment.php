<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = [
        'comment'
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function shoppinglist() : BelongsTo
    {
        return $this->belongsTo(Shoppinglist::class);
    }
}
