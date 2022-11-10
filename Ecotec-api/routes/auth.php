<?php

use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\RegisterController;
use Illuminate\Support\Facades\Route;




Route::prefix('auth')->group(function () {
    Route::post('/admin-register', [RegisterController::class, 'adminRegister'])->name('admin-register');
    Route::post('/admin-login', [LoginController::class, 'adminLogin'])->name('admin-login');


    // Manager authentication
    // Route::post('/manager-register', [ApiAuthController::class, 'managerRegister'])->name('manager-register');
    Route::post('/teacher-login', [LoginController::class, 'teacherLogin'])->name('teacher-login');


    //Students authentication
    // Route::post('/user-register', [ApiAuthController::class, 'userRegister'])->name('user-register');
    Route::post('/student-login', [LoginController::class, 'studentLogin'])->name('student-login');
    Route::post('/student-register', [RegisterController::class, 'studentRegister'])->name('student-register');
});
