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

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Credenciales invalidas'], 401);
        }

        
        return $this->createNewToken($token);
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

        try {
            $token = $this->createNewToken(auth()->refresh());
            return response()->json(['success' => true, 'token' => $token], 200);
        } catch (TokenExpiredException $ex) {
            // We were unable to refresh the token, our user needs to login again
            return response()->json([
                 'success' => false, 'message' => 'Need to login again, please (expired)!'
            ]);
        } catch (TokenBlacklistedException $ex) {
            // Blacklisted token
            return response()->json([
                 'success' => false, 'message' => 'Need to login again, please (blacklisted)!'
            ], 422);
        }
        
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
    protected function createNewToken($token){

      

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 120,
            'user' => [
                'uuid' => auth()->user()->uuid,
                'first_name' => auth()->user()->first_name,
                'last_name' => auth()->user()->last_name,
                'email' => auth()->user()->email,
                'role' => auth()->user()->roles->first()->name
            ]
        ]);
    }
  
}