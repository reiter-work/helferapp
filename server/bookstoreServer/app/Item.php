<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Item extends Model
{
    protected $fillable = [
        'title',
        'price',
        'price_max',
        'price_payed',
    ];

    public function item() : BelongsTo
    {
        return $this->belongsTo(Shoppinglist::class);
    }
}
