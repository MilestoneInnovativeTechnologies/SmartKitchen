<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Events\LoggingOut;
use Milestone\SmartKitchen\Events\LoggedOut;
use Milestone\SmartKitchen\Models\User;

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

    public static function data(){
        $data = request(['name','pin','login','password','role']);
        //if(isset($data['password'])) $data['password'] = Hash::make($data['password']);
        $data = array_merge($data,['email_verified_at' => now()->toDateTimeString(),'remember_token' => Str::random(10)]);
        return $data;
    }

    public static function create(){
        $item = new User(self::data()); $item->save();
        return $item;
    }

    public function manage(){
        if(!request()->has('id') || !request()->filled('id')) return self::create();
        $item = User::find(request()->input('id'));
        $item->update(self::data());
        return $item->fresh();
    }
}
