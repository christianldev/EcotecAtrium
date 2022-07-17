<?php

use App\Http\Controllers\API\CourseController;
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



Route::controller(CourseController::class)->middleware("jwt.verify")->group(function () {
      // Courses
      Route::get('courses/student/{student_id}', 'getStudentCourses');
      Route::post('course/create', 'store');
      Route::post('course/update/{course_id}', 'update');

});

require __DIR__.'/auth.php';