<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{


  public function getUsersList(){
    try{
      $users = User::all();
      if(count($users) > 0){
        return response()->json([
          'status' => 'success',
          'data' => $users
        ], 200);
      }else{
        return response()->json([
          'status' => 'error',
          'message' => 'No se encontraron usuarios'
        ], 404);
      }
    }catch(\Exception $e){
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  
  public function getStudentsList()
  {
    $students = User::where('role', 'student')->get();

    try {
      if ($students->isEmpty()) {
        return response()->json(['error' => 'No students found'], 404);
      }
      return response()->json($students, 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
}