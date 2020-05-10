<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Item;
use App\Shoppinglist;
use Carbon\Carbon;
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

            $shoppinglists = Shoppinglist::where('user_id', $this->getUID($req))->with('item')->get();
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
            DB::commit();

            return response()->json([$shoppinglist], 201);

        } catch (Error $e) {

            DB::rollBack();
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }

    }

    public function createItem(Request $req){
        $req = $this->parseReq($req);

        DB::beginTransaction();

        try {
            $shoppingitem = Item::create([

                'title' => $req->title,
                'shoppinglist_id' => $req->shoppinglist_id,
                'amount' => $req->amount,
                'price_max' => $req->price_max,
                'price_payed' => $req->price_payed,
                'isDone' => false,

            ]);
            DB::commit();

            return response()->json([$shoppingitem], 201);

        } catch (Error $e) {

            DB::rollBack();
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function updateList(Request $req)
    {
        DB::beginTransaction();

        try {

            $req = $this->parseReq($req);

            $shoppinglist = Shoppinglist::find($req->id)->with('item', 'comment')->first();

            $shoppinglist->update($req->all());

            //updateItems
            $items = [];

            //get all current shopping items
            foreach($shoppinglist->item as $item){
                array_push($items, Item::find($item->id));
            }

            //sync with sent items

            foreach ($req->item as $itemToSync){



            }

            //$shoppinglist->comment = $req->comment;
//            TODO Comments


            $shoppinglist->save();
            DB::commit();

            return response()->json(Shoppinglist::find($req->id), 201);


        } catch (Error $e) {

            DB::rollBack();
            return response()->json([
                'response' => 'Updating Shoppinglist failed',
                'message' => $e->getMessage()
            ],420);
        }
    }

    public function deleteItemById($id){

        try{

            $item = Item::find($id);

            if($item){
                $item->delete();
            }

            return response()->json('deleted', 204);

        }catch (Error $e) {
            return response()->json([
                'response' => 'Deleting Item failed',
                'message' => $e->getMessage()
            ], 420);
        }
    }

    public function updateItem(Request $req){

        DB::beginTransaction();

        try{

            $req = $this->parseReq($req);

            $item = Item::find($req->id);
            $item->update($req->all());
            $item->save();
            DB::commit();

            return response()->json($req->id, 202);


        } catch (Error $e){

            DB::rollBack();

            return response()->json([
                'response' => 'Updating Item failed',
                'message' => $e->getMessage()
            ], 420);

        }

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
