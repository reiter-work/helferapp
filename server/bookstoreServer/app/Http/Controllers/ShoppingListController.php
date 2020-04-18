<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Item;
use App\Shoppinglist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Error;
use JWTAuth;

class ShoppingListController extends Controller
{
    //get ShoppingList by ID -> not routed
    public function getListById($id)
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

    public function getShoppinglistByUser(Request $req)
    {
        try {

            $shoppinglists = Shoppinglist::where('user_id', $this->getUID($req))->get();
            return $shoppinglists;

        } catch (Error $e) {
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createList(Request $req)
    {
        $req = $this->parseReq($req);
        $uid = $this->getUID($req);

        DB::beginTransaction();

        try {
            $shoppinglist = Shoppinglist::create([

                'user_id' => $uid,
                'title' => $req->title,
                'dueDate' => $req->dueDate,

            ]);

            $items = $req->item;

            foreach($items as $item){

                $newItem = Item::create([
                           'shoppinglist_id' => $shoppinglist->id,
                           'title' => $item['title'],
                        ]);

                if(isset($item['price_max'])) $newItem->price_max = $item['price_max'];
                if(isset($item['amount'])) $newItem->price_max = $item['amount'];
                if(isset($item['price_payed'])) $newItem->price_max = $item['price_payed'];
            }

            $comments = $req->comment;

            foreach($comments as $comment){

                Comment::create([
                    'user_id' => 2,
                    'shoppinglist_id' => $shoppinglist->id,
                    'comment' => $comment['comment'],
                ]);

            }

            DB::commit();

            $shoppinglist->item;
            $shoppinglist->comment;

            return response()->json([$shoppinglist,], 201);

        } catch (Error $e) {

            DB::rollBack();
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }

    }

    public function updateList($id)
    {

    }

    private function getUID($req) : int{

        $token = $req->bearerToken();
        return JWTAuth::getPayload($token)['user']->id;

    }

    private function parseReq(Request $req) : Request{
        $date = new \DateTime($req->dueDate);
        $req['dueDate'] = $date;

        return $req;
    }


}
