<?php

namespace App\Http\Controllers;

use App\Shoppinglist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Error;
use JWTAuth;

class ShoppingListController extends Controller
{
    //get ShoppingList by ID -> not routed
    public static function getListById($id)
    {

        try {
            $shoppinglist = Shoppinglist::find($id);
            if ($shoppinglist) {

                $shoppinglist->item;
                $shoppinglist->comment;

                return response()->json([
                    'shoppinglists' => $shoppinglist
                ], 200);
            } else {
                return response()->json([], 404);
            }

        } catch (Error $e) {
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }

    }

    public static function getShoppinglistByUser(Request $request)
    {

        $req = $request->parseRequest($request);

        try {
            return response()->json([
                'shoppinglist' => Shoppinglist::find($uid),
            ]);
        } catch (Error $e) {
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public static function createList(Request $req)
    {

        try {
            $list = new Shoppinglist;
            $list->title = $req->title;
            $list->dueDate = $req->dueDate;
            $list->save();
        } catch (Error $e) {
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'response' => 'success'
        ]);

    }

    public static function updateList($id)
    {

    }
}
