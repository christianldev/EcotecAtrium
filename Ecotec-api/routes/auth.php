<?php

use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\RegisterController;
use Illuminate\Support\Facades\Route;




Route::group([

    'middleware' => 'api',

], function () {
    Route::post('login', [LoginController::class, 'login']);
});

Route::controller(LoginController::class)->middleware("jwt.verify")->group(function () {
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('profile', 'userProfile');
});

Route::post('register', [RegisterController::class, 'register'])->middleware("auth:api");