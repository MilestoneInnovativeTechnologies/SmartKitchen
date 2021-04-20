<?php

use Illuminate\Support\Facades\Route;
use \Illuminate\Http\Request;
use \Milestone\SmartKitchen\Controllers\AuthController;
use \Milestone\SmartKitchen\Controllers\UserController;
use \Milestone\SmartKitchen\Controllers\APIController;
use \Milestone\SmartKitchen\Controllers\AssetController;
use \Milestone\SmartKitchen\Controllers\MediaController;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenAction;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenGuest;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenAuth;
use \Milestone\SmartKitchen\Middlewares\APIRequest;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenServer;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenSync;
use Milestone\SmartKitchen\Models\Remote;
use Milestone\SmartKitchen\Models\Sync;
use \Milestone\SmartKitchen\Server\ServerController;

$clientDBs = [
    'demo'   => ['u752305367_smartkitchen','u752305367_smartkitchen','u752305367_SmartKitchen'],
    'bbq'   => ['u752305367_smartkitchen','u752305367_smartkitchen','u752305367_SmartKitchen'],
    'bt'   => ['u752305367_brandtalkies','u752305367_brandtalkies','u752305367_BrandTalkies'],
    'grand'   => ['u752305367_grand','u752305367_grand','u752305367_Grand'],
    'client1'   => ['smartkitchen','root','metalic'],
    'server'   => ['skdep','root','metalic'],
    'dolphin'   => ['u752305367_dolphin','u752305367_dolphin','u752305367_Dolphin'],
];


if(CLIENT && array_key_exists(CLIENT,$clientDBs)) foreach (['database', 'username', 'password'] as $idx => $key) config()->set("database.connections.mysql.$key", $clientDBs[CLIENT][$idx]);

Route::group([
    'middleware' => 'cache.headers:public;max_age=2628000;etag',
], function () {
    Route::get('assets/{time}/{model}.js', [AssetController::class, 'JSAsset'])->name('asset');
});

Route::group([
    'middleware' => ['api'],
], function () {

    Route::group([
        'middleware' => [SmartKitchenGuest::class],
    ], function () {
        Route::view('login', 'SK::login')->name('login');
        Route::post('login', [AuthController::class, 'login']);
    });

    Route::get('/', function (Request $request) {
        if ($request->cookie('token')) return view('SK::home');
            return redirect()->route('login')->withCookie(cookie()->forget('token'));
    })->name('home');

    Route::group([
        'middleware' => [SmartKitchenAuth::class],
    ], function () {

        Route::get('logout', [UserController::class, 'logout'])->name('logout');
        Route::get('refresh', [AuthController::class, 'refresh']);
        Route::view('pre_home', 'SK::pre_home')->name('pre_home');

        Route::group([
            'prefix' => 'api/v1'
        ], function () {
            Route::get('/', function () { return route('base_url'); })->name('base_url');
            Route::post('me', function () { return ck(); });
            Route::post('ping', [APIController::class, 'ping'])->middleware(SmartKitchenSync::class);

            Route::group([
                'middleware' => [APIRequest::class, SmartKitchenAction::class],
            ], function () {
                Route::post('{item}/{action}', [APIController::class, 'ping']);
            });

        });

        Route::group([
            'prefix' => 'media'
        ], function () {
            Route::get('/', function () {
                return '';
            })->name('media_root');
            Route::post('remove', [MediaController::class, 'remove']);
            Route::post('upload', [MediaController::class, 'upload']);

        });

    });
});

Route::group([
    'prefix' => 'server',
    'middleware' => [SmartKitchenServer::class],
],function(){
    Route::get('/',[ServerController::class,'index'])->name('server');
    Route::get('{location}/{item}/all/watch',[ServerController::class,'watch']);
    Route::post('{location}/{item}/{id}/{method}',[ServerController::class,'process']);
});

Route::get('test', function (Request $request) {
    dd(\Milestone\SmartKitchen\Models\Kitchen::getClouds());
//    Sync::where('progress','Completed')->get()->each(function($sync){ $sync->progress = 'New'; $sync->status = 'New'; $sync->save(); });
//    dd(Sync::pending());
//    return ServerController::response('kitchen','7','item_details');
});
