<?php

use Illuminate\Support\Facades\Route;
use \Milestone\SmartKitchen\Controllers\AuthController;
use \Milestone\SmartKitchen\Controllers\UserController;
use \Milestone\SmartKitchen\Controllers\APIController;
use \Milestone\SmartKitchen\Controllers\AssetController;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenAction;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenGuest;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenAuth;
use \Milestone\SmartKitchen\Middlewares\APIRequest;
use \Illuminate\Http\Request;

Route::group([
    'middleware' => 'cache.headers:public;max_age=2628000;etag',
],function(){
    Route::get('assets/{time}/{model}.js',[AssetController::class,'JSAsset'])->name('asset');
});

Route::group([
    'middleware' => ['api'],
],function(){

    Route::group([
        'middleware' => [SmartKitchenGuest::class],
    ],function(){
        Route::view('login','SK::login')->name('login');
        Route::post('login',[AuthController::class,'login']);
    });

    Route::get('/',function(Request $request){
        if($request->cookie('token')) return view('SK::home');
        return redirect()->route('login')->withCookie(cookie()->forget('token'));
    })->name('home');

    Route::group([
        'middleware' => [SmartKitchenAuth::class],
    ],function(){

        Route::get('logout',[UserController::class,'logout'])->name('logout');
        Route::get('refresh',[AuthController::class,'refresh']);
        Route::view('pre_home','SK::pre_home')->name('pre_home');

        Route::group([
            'prefix' => 'api/v1'
        ],function(){
            Route::get('/',function(){ return route('base_url'); })->name('base_url');
            Route::post('ping',[APIController::class,'ping']);
            Route::post('me',function(){ return ck(); });

            Route::group([
                'middleware' => [APIRequest::class,SmartKitchenAction::class],
            ],function(){
                Route::post('{item}/{action}',[APIController::class,'ping']);
            });

        });

    });
});

/*
Route::group([
    'middleware' => ['api','guest'],
],function(){
    Route::view('login','SK::login')->name('login');
    Route::post('login',[AuthController::class,'login']);
});


Route::group([
    'middleware' => ['api','auth:api'],
],function(){
    Route::get('logout',[UserController::class,'logout'])->name('logout');
    Route::get('refresh',[AuthController::class,'refresh']);
    Route::view('pre_home','SK::pre_home')->name('pre_home');
});

Route::view('/','SK::home')->name('home');

Route::group([
    'middleware' => ['api','auth:api'],
    'prefix' => 'api/v1'
],function(){
    Route::get('/',function(){ return route('base_url'); })->name('base_url');
    Route::post('ping',[APIController::class,'ping']);
    Route::post('me',function(){ return ck(); });
});

Route::group([
    'middleware' => ['api','auth:api',SmartKitchenAction::class],
    'prefix' => 'api/v1'
],function(){
    Route::post('{item}/{action}',[APIController::class,'ping']);
});
*/
// Temporary

Route::get('test',function(Request $request){
    $token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vc2svbG9naW4iLCJpYXQiOjE2MDc5MTgxNjAsIm5iZiI6MTYwNzkxODE2MCwianRpIjoieFhBSFVlQXBOcEdoU3R2NSIsInN1YiI6MjEsInBydiI6IjYyNDBiNTJjYmE2ZTI0NzA4MDlmODZmNmVhYWIwOWYyNGY5MzM1NjkifQ.ovu0i1sMQrs27YFMUda8LN3hnh7THOYwcB9-1XlQQuo';
    dd($request->all(),$request->merge(json_decode(base64_decode(explode(".",$token)[1]),true)),$request->all());
});