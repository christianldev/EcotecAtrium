<?php

namespace App\Http\Controllers\API\Auth;

use Validator;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenBlacklistedException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTFactory;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Authenticate a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(Request $request)
    {

        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if( $validator->fails() ) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        if(!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Crednciales invalidas'], 401);
        }

        $role = auth()->user()->roles->first()->name;

        $user = auth()->user()->only(['uuid', 'first_name', 'last_name', 'email']);

        $user['role'] = $role;

    
       
        return $this->createNewToken( $user);

    }

     /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        $token = JWTAuth::getToken();

        try {
            $token = JWTAuth::invalidate($token);
            return response()->json([
                'success' => true, 'message' => "Sesión cerrada correctamente"
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false, 'message' => 'Fallo al cerrar sesión'
            ], 422);
        }
    }
    
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        
        $token = JWTAuth::getToken();
        $token = JWTAuth::refresh($token);
        return response()->json([
            'success' => true, 'token' => $token
        ], 200);

        
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json(['success' => true, 'data' => $user], 200);
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'data' => 'Token is invalid'], 422);
        }
       
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken( $user) {

        $payload = JWTFactory::sub($user['uuid'])
        ->user($user)
        ->make();
      
       $reponse = JWTAuth::encode($payload);
       $reponse = $reponse->get();

        return response()->json([
            'user' => $user,
            'access_token' => $reponse,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
  
}
