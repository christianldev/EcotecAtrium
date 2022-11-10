<?php

namespace App\Http\Controllers\API\Auth;


use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{

    public function studentLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (auth()->guard('student')->attempt([
            'email' => request('email'),
            'password' => request('password'),
        ])) {
            config(['auth.guards.api.provider' => 'student']);
            $manager = Student::select('students.*')->find(auth()->guard('student')->user()->id);
            $success = $manager;
            $success['access_token'] = $manager->createToken('studentApp', ['student'])->accessToken;
            return response()->json($success, 201);
        } else {
            return response()->json(['errors' => 'Correo o contraseña incorrectos'], 401);
        }
    }

    public function teacherLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (auth()->guard('teacher')->attempt([
            'email' => request('email'),
            'password' => request('password'),
        ])) {
            config(['auth.guards.api.provider' => 'teacher']);
            $manager = Teacher::select('teachers.*')->find(auth()->guard('teacher')->user()->id);
            $success = $manager;
            $success['access_token'] = $manager->createToken('teacherApp', ['teacher'])->accessToken;
            return response()->json($success, 201);
        } else {
            return response()->json(['errors' => 'Correo o contraseña incorrectos']);
        }
    }

    public function adminLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()]);
        }


        if (auth()->guard('admin')->attempt([
            'email' => request('email'),
            'password' => request('password'),
        ])) {
            config(['auth.guards.api.provider' => 'admin']);
            $admin = Admin::select('admins.*')->find(auth()->guard('admin')->user()->id);
            $success = $admin;
            $success['access_token'] = $admin->createToken('myApp', ['admin'])->accessToken;
            return response()->json($success, 201);
        } else {
            return response()->json(['errors' => 'Correo o contraseña incorrectos']);
        }
    }
    /**end  */



    public function userLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Password grant token')->accessToken;
                $response = ['token' => $token];
                return response()->json($response, 201);
            } else {
                $response = ['message' => 'Invalid email or password'];
                return response()->json($response, 422);
            }
        } else {
            $message = ['message' => 'User does not exist'];
            return response()->json($message, 422);
        }
    }
}
