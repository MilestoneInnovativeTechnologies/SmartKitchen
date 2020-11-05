<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Milestone\SmartKitchen\Events\LoggingOut;
use Milestone\SmartKitchen\Events\LoggedOut;

class UserController extends Controller
{
    public function Logout(){
        if(Auth::user()){
            $user = Auth::user(); Log::info('User logging out. User ID: ' . $user->id);
            LoggingOut::dispatch($user);
            Auth::logout(); LoggedOut::dispatch($user);
        }
        return redirect('login');
    }
}
