<?php

namespace App\Http\Controllers\API\Auth;

use Validator;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;

class RegisterController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request, User $user)
    {
        $roles = Role::all();

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|between:2,100',
            'last_name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'dni' => 'required|string|max:10|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'password_confirmation' => 'required|string|min:6|same:password',
            'gender' => 'required|string',
            'nationality' => 'required|string',
            'phone' => 'required|string|min:10|max:10',
            'address' => 'required|string',
            'address2' => 'required|string',
            'city' => 'required|string',
            'zip' => 'required|string',
            'role' => 'required|string',
        ]);

        foreach($roles as $role){
            if($role->name == $request->role){
                $role_id = $role->id;
            }
            
        }


        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        //if has a remember_token save it in the database
        if ($request->has('remember_token')) {
            $remember_token = $request->remember_token;
        } else {
            $remember_token = null;
        }
        

        $user = User::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'remember_token' => $remember_token,
            ],


        ));

        $user->assignRole($role_id);


        return response()->json([
            'message' => 'Usuario registrado con éxito',
           
        ], 201);
    }
}