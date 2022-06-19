<?php

use App\Http\Controllers\UserController;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// group of routes for the user controller middleware
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', [UserController::class, 'getUsersList']);
    Route::get('/students', [UserController::class, 'getStudentsList']);
});