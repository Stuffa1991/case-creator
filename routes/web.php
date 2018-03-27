<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['guest']], function () {
    Route::get('login', 'SteamController@login')->name('login');
});

Route::group(['middleware' => ['auth']], function () {
    Route::get('logout', 'SteamController@logout')->name('logout');
});

Route::group(['prefix' => 'api/case'], function () {
    Route::post('create', 'CaseController@createcase');
    Route::get('open/{id}', 'CaseController@opencase');
});

Route::group(['prefix' => 'api'], function () {
    Route::get('user', 'UserController@myaccount');
});

Route::get('/{vue?}', function () {
    return view('index');
})->where('vue', '[\/\w\.-]*');
