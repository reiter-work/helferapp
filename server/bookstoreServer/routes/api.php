<?php

use App\ShoppingList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


/* auth */
Route::group(['middleware' => ['api', 'cors']], function () {
    Route::post('auth/login', 'Auth\ApiAuthController@login');
});

// methods which need authenticatoion - JWT Token
Route::group(['middleware' => ['api', 'cors', 'auth.jwt']], function () {

    Route::post('auth/logout', 'Auth\ApiAuthController@logout');

    /**ShoppingListRouts**********************************/

    //get all Shoppinglists by User
    Route::get('shoppinglist/user', 'ShoppingListController@getShoppinglistByUser');

    //create new Shoppinglist
    Route::post('shoppinglist', 'ShoppingListController@createList');

    //update Shoppinglist
    Route::put('shoppinglist', 'ShoppingListController@updateList');

    //delete Shoppinglist by ID
    Route::delete('shoppinglist/{id}', 'ShoppingListController@deleteListById');

    /**Shoppingitem Routes*****************************/

    //create Item
    Route::post('shoppinglist/item', 'ShoppingListController@createItem');

    //update Item
    Route::put('shoppinglist/item', 'ShoppingListController@updateItem');

    //delete Item by ID
    Route::delete('shoppinglist/deleteItem/{id}', 'ShoppingListController@deleteItemById');

});





