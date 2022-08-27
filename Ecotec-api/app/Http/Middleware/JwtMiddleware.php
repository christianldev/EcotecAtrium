<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'token expirado'], 401);
            } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'token invalido'], 401);
            } catch (JWTException $e) {
            return response()->json(['error' => 'token no encontrado'], 401);
            } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
            }
            return $next($request);
    }
}