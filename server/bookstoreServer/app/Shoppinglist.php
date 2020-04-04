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



    public static function getListById($id) {
        //TODO implement userpermissions
        $shoppingList = DB::table('shoppinglist')->where('id', $id)->get();
        $listItems = DB::table('items')->where('shoppingListId', $id)->get();

        return json_encode(['shoppingList' => $shoppingList, 'items' => $listItems]);
    }

    public static function createList()
    {

    }

    public static function updateList($id)
    {
    }
}
