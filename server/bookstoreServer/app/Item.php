<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    protected $fillable = [
        'title',
        'amount',
        'shoppinglist_id',
        'price_max',
        'price_payed',
        'isDone',
    ];

    public function shoppinglist() : BelongsTo
    {
        return $this->belongsTo(Shoppinglist::class);
    }
}
