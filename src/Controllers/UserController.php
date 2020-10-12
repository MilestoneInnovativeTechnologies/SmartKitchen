<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Milestone\SmartKitchen\Jobs\ChefLogOut;

class UserController extends Controller
{
    public function Logout(){
        if(Auth::user()){
            $loginsOrm = Auth::user()->Logins()->where('out',0);
            if($loginsOrm->exists()){
                Auth::user()->Logins()->where('out',0)->update(['out' => time()]);
                Log::info('Logged out user logs!! User ID: ' . Auth::id());
                if(Auth::user()->role === 'Chef') ChefLogOut::dispatch(Auth::id());
            }
            Log::info('User logging out. User ID: ' . Auth::id());
            Auth::logout();
        }
        return redirect('login');
    }
}
