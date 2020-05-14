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

    public function updateList(Request $req)
    {
        DB::beginTransaction();

        try {

            $req = $this->parseReq($req);

            $shoppinglist = Shoppinglist::find($req->id);

            $shoppinglist->update($req->all());

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

    public function deleteListById($id){

        try{

            $shoppinglist = Shoppinglist::find($id);

            if($shoppinglist){
                $shoppinglist->delete();
            }

            return response()->json('deleted', 204);

        }catch (Error $e) {
            return response()->json([
                'response' => 'Deleting Item failed',
                'message' => $e->getMessage()
            ], 420);
        }
    }

    public function getClaimedLists(Request $req)
    {
        try {

            $shoppinglists = Shoppinglist::where('helper_id', $this->getUID($req))->with('item')->get();
            return $shoppinglists;

        } catch (Error $e) {
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getToBeClaimedLists()
    {
        try {

            $shoppinglists = Shoppinglist::where('helper_id', null)->with('item')->get();
            return $shoppinglists;

        } catch (Error $e) {
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }


    public function claimList($id, Request $req)
    {
        try {

            $shoppinglist = Shoppinglist::find($id);

            $shoppinglist->helper_id = $this->getUID($req);

            $shoppinglist->save();

            return $shoppinglist;

        } catch (Error $e) {
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

            return response()->json($item, 202);


        } catch (Error $e){

            DB::rollBack();

            return response()->json([
                'response' => 'Updating Item failed',
                'message' => $e->getMessage()
            ], 420);

        }

    }

    public function toggleItem($id){
        $item = Item::find($id);
        $item->isDone = !$item->isDone;
        $item->save();
        return $item;
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
