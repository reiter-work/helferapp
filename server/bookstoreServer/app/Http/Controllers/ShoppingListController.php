<?php

namespace App\Http\Controllers;

use App\Shoppinglist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Error;

class ShoppingListController extends Controller
{
    public static function getListById($id) {
        //TODO implement userpermissions


//        $shoppingList = DB::table('shoppinglists')->where('id', $id)->get();
//        $listItems = DB::table('items')->where('shoppingListId', $id)->get();

        return json_encode([ Shoppinglist::find($id)]);
    }

    public static function createList(Request $req) {

        try{
            $list = new Shoppinglist;
            $list->title = $req->title;
            $list->dueDate = $req->dueDate;
            $list->save();
        }
        catch (Error $e){
            return "Error: " . $e->getMessage();
        }

        return "Saved";

    }

    public static function updateList($id) {

    }
}
