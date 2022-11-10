<?php

use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\RoleController;
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

Route::prefix('admin')->group(
      function () {


            //Role route
            Route::get('/roles', [RoleController::class, 'index'])->name('roles')->middleware(['auth:admin-api', 'scopes:admin'])->name('roles');
            Route::post('/create-role', [RoleController::class, 'createRoles'])->name('roles')->middleware(['auth:admin-api', 'scopes:admin'])->name('create-role');
            Route::post('/assign-role/{id}', [RoleController::class, 'addPermissionRoles'])->name('assign-role')->middleware(['auth:admin-api', 'scopes:admin'])->name('assign-role');
      }
);



Route::prefix('leaves')->group(function () {
      Route::get('/', [LeaveController::class, 'index'])->name('all-leaves');
      Route::get('/approved-leaves', [LeaveController::class, 'approvedLeaves'])->name('approved-leaves');
      Route::get('/unapproved', [LeaveController::class, 'unapprovedLeaves'])->name('unapproved');
      Route::post('/create-leave', [LeaveController::class, 'createLeave'])->name('create-leave');
      Route::get('/pending-leaves', [LeaveController::class, 'pendingLeave'])->name('pending-leaves');
});



// Admin API Routes

Route::controller(CourseController::class)->middleware(["jwt.verify", "role:admin|student"])->group(function () {

      // Courses
      Route::get('courses/student/{student_id}', 'getStudentCourses');
      Route::post('course/create', 'store');
      Route::post('course/update/{course_id}', 'update');
});

Route::controller(UserController::class)
      ->prefix('admin')
      ->middleware(['jwt.verify', 'auth:admin-api', 'scopes:admin'])->group(function () {

            // Users
            Route::get('users', 'getUsersList')->name('users');
            Route::get('users/students', 'getStudentsList');
            Route::get('users/{user_id}', 'getUser');
            Route::post('add-user', 'addUser')->name('add-user');
            Route::post('user/update/{user_id}', 'update');
            Route::post('user/delete/{user_id}', 'delete');
      });

//Student API Routes
Route::controller(CourseController::class)->middleware(["jwt.verify", "role:student"])->group(function () {

      // Courses
      Route::get('courses/student/{student_id}', 'getStudentCourses');
});


require __DIR__ . '/auth.php';
