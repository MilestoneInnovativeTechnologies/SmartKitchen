<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Events\LoggingOut;
use Milestone\SmartKitchen\Events\LoggedOut;

class UserController extends Controller
{
    public function Logout(){
        if(auth()->user()){
            $user = auth()->user(); Log::info('User logging out. User ID: ' . $user->id);
            LoggingOut::dispatch($user);
            auth()->logout(); LoggedOut::dispatch($user);
        }
        return redirect()->route('login')->withCookie(cookie()->forget('token'));
    }
}
