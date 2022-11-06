<?php

use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\UserController;
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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Admin API Routes

Route::controller(CourseController::class)->middleware(["jwt.verify", "role:admin|student"])->group(function () {
    
      // Courses
      Route::get('courses/student/{student_id}', 'getStudentCourses');
      Route::post('course/create', 'store');
      Route::post('course/update/{course_id}', 'update');

});

Route::controller(UserController::class)->middleware(["jwt.verify", "role:admin"])->group(function () {
    
      // Users
      Route::get('users', 'getUsersList');
      Route::get('users/students', 'getStudentsList');
      Route::get('users/{user_id}', 'getUser');
      Route::post('user/create', 'createUser');
      Route::post('user/update/{user_id}', 'update');
      Route::post('user/delete/{user_id}', 'delete');

});

//Student API Routes
Route::controller(CourseController::class)->middleware(["jwt.verify", "role:student"])->group(function () {
    
      // Courses
      Route::get('courses/student/{student_id}', 'getStudentCourses');

});


require __DIR__.'/auth.php';