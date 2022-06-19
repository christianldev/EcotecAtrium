<?php

use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\RegisterController;
use Illuminate\Support\Facades\Route;




Route::group([

    'middleware' => 'api',

], function () {

    Route::post('login', [LoginController::class, 'login']);
    Route::post('register', [RegisterController::class, 'register']);
    // Route::post('refresh', 'AuthController@refresh');
    // Route::post('me', 'AuthController@me');
});

Route::controller(LoginController::class)->middleware("auth:api")->group(function () {
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});