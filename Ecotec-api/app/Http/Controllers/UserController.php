<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

  // public function __construct( )
  // {
  //   $this->middleware('permission:user-list|user-create|user-edit|user-delete', ['only' => ['getUsersList', 'getStudentsList', 'getUser']]);
  //   $this->middleware('permission:user-create', ['only' => ['createUser']]);
  //   $this->middleware('permission:user-edit', ['only' => ['update']]);
  //   $this->middleware('permission:user-delete', ['only' => ['delete']]);
  // }

  public function getUsersList()
  {
    try {
      $users = User::paginate(5);
      if (count($users) > 0) {
        return $users;
      } else {
        return response()->json([
          'status' => 'error',
          'message' => 'No se encontraron usuarios'
        ], 404);
      }
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  public function getStudentsList()
  {


    $students = DB::table('users')
      ->join('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
      ->where('model_has_roles.role_id', '=', 1)
      ->select('users.*')
      ->get();

    if (count($students) > 0) {
      return $students;
    } else {
      return response()->json([
        'status' => 'error',
        'message' => 'No se encontraron estudiantes'
      ], 404);
    }
  }

  public function addUser(Request $request)
  {




    $validator = Validator::make($request->all(), [
      'first_name' => 'required',
      'last_name' => 'required',
      'email' => 'required|email',
      'password' => 'required|min:6',
      'dni' => 'required',
      'gender' => 'required',
      'nationality' => 'required',
      'phone' => 'required|numeric|min:10',
      'address' => 'required',
      'city' => 'required',
      'zip' => 'required',
      // 'photo' => 'image|mimes:jpeg,png,jpg|max:2048',
      'birthday' => 'required|date_format:d-m-Y|before:today',
      'roles' => 'required'

    ]);

    try {

      if ($validator->fails()) {
        return response()->json($validator->errors());
      }
      $user = User::create([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'dni' => $request->dni,
        'gender' => $request->gender,
        'nationality' => $request->nationality,
        'phone' => $request->phone,
        'address' => $request->address,
        'address2' => $request->address2,
        'city' => $request->city,
        'zip' => $request->zip,
        'photo' => $request->photo,
        'birthday' => $request->birthday,
        'blood_type' => $request->blood_type,

      ]);
      $user->assignRole($request->input('roles'));
      return response()->json([
        'status' => 'success',
        'message' => 'Usuario creado correctamente'
      ], 201);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function updateUser(Request $request, $id)
  {


    $validator = Validator::make($request->all(), [
      'first_name' => 'required',
      'last_name' => 'required',
      'email' => 'required|email',
      'dni' => 'required',
      'gender' => 'required',
      'nationality' => 'required',
      'phone' => 'required|numeric|min:10',
      'address' => 'required',
      'address2' => 'required',
      'city' => 'required',
      'zip' => 'required',
      'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
      'birdthday' => 'required|date',
      'blood_type' => 'required',
      'religion' => 'required',
      'roles' => 'required'
    ]);

    try {
      $user = User::find($id);
      $user->first_name = $request->first_name;
      $user->last_name = $request->last_name;
      $user->email = $request->email;
      $user->dni = $request->dni;
      $user->gender = $request->gender;
      $user->nationality = $request->nationality;
      $user->phone = $request->phone;
      $user->address = $request->address;
      $user->address2 = $request->address2;
      $user->city = $request->city;
      $user->zip = $request->zip;
      $user->photo = $request->photo;
      $user->birdthday = $request->birdthday;
      $user->blood_type = $request->blood_type;
      $user->religion = $request->religion;
      $user->roles = $request->roles;
      $user->save();

      $user->syncRoles($request->role);
      return response()->json([
        'status' => 'success',
        'message' => 'Usuario actualizado correctamente'
      ], 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function deleteUser($id)
  {
    try {
      $user = User::find($id);
      $user->delete();
      return response()->json([
        'status' => 'success',
        'message' => 'Usuario eliminado correctamente'
      ], 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
}
