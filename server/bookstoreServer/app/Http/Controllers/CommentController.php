<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Shoppinglist;
use App\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function getCommentsForShoppinglist($id)
    {
        try {

            $comments = Comment::where('shoppinglist_id', $id)->get();

            return response()->json($comments, 200);

        } catch (Error $e) {
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function newComment(Request $request)
    {
        try {

            $comment = Comment::create(
                $request->all()
            );

            return response()->json($comment, 200);

        } catch (Error $e) {
            return response()->json([
                'response' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

}
