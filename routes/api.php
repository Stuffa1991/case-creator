<?php

use Illuminate\Http\Request;

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

Route::group(['prefix' => 'steamlytics'], function () {
    Route::get('items', 'SteamLyticsController@items');
    Route::get('itemsPopular', 'SteamLyticsController@itemsPopular');
    Route::get('price/{name}', 'SteamLyticsController@price');
    Route::get('pricelistcompact', 'SteamLyticsController@priceListCompact');
    Route::get('pricelist', 'SteamLyticsController@priceList');
    Route::get('populate', 'SteamLyticsController@populate');
    Route::get('updateprices', 'SteamLyticsController@updatePrices');
});

Route::group(['prefix' => 'case'], function () {
    Route::get('items', 'CaseController@items');
    Route::get('images', 'CaseController@images');
    Route::get('all', 'CaseController@cases');
    Route::get('get/{id}', 'CaseController@case');
});
