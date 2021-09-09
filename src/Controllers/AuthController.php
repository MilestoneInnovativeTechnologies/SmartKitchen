<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Milestone\SmartKitchen\Events\LoggedIn;
use Milestone\SmartKitchen\Models\User;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(){ $this->middleware('auth:api', ['except' => ['login']]); }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(){
        if(request()->has('pin')) {
            $credentials = request(['pin']);
            $user = User::where(SubscriptionController::LoginCredentials($credentials))->first();
            $token = $user ? auth()->login($user) : null;
        } else {
            $credentials = request(['id', 'password']);
            $token = auth()->attempt(SubscriptionController::LoginCredentials($credentials));
        }
        if (!$token) return redirect()->route('login',['msg' => 'Unauthorized Access!!']);
        $lsk = config("sk.login_log_section_role_key"); $section = null;
        if($lsk && array_key_exists(auth()->user()->role,$lsk)) $section = request()->input($lsk[auth()->user()->role]);
        LoggedIn::dispatch(auth()->user(),$section);
        return redirect()->route('pre_home',compact('token'))->withCookie(cookie()->forever('token',$token));
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(){ return response()->json(auth()->user()); }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        $key = cache()->forget(ck());
        auth()->logout();
        return redirect()->route('login');
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() { return $this->respondWithToken(auth()->refresh()); }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
