<?php

use Illuminate\Support\Facades\Route;
use \Milestone\SmartKitchen\Controllers\AuthController;
use \Milestone\SmartKitchen\Controllers\UserController;
use \Milestone\SmartKitchen\Controllers\APIController;
use \Milestone\SmartKitchen\Controllers\AssetController;
use \Milestone\SmartKitchen\Controllers\MediaController;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenAction;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenGuest;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenAuth;
use \Milestone\SmartKitchen\Middlewares\APIRequest;
use \Illuminate\Http\Request;

$Domain = implode(".",array_slice(explode('.', request()->getHost()),1));

$clientDBs = [
    'demo'   => ['u752305367_smartkitchen','u752305367_smartkitchen','u752305367_SmartKitchen'],
    'bbq'   => ['u752305367_smartkitchen','u752305367_smartkitchen','u752305367_SmartKitchen'],
    'bt'   => ['u752305367_brandtalkies','u752305367_brandtalkies','u752305367_BrandTalkies'],
    'client1'   => ['smartkitchen','root','metalic'],
];

Route::domain('{client}.' . $Domain)->group(function() use($clientDBs) {
    $client = explode('.', request()->getHost())[0];
    define('CLIENT',$client);
    if (array_key_exists($client, $clientDBs)) {
        foreach (['database', 'username', 'password'] as $idx => $key) {
            config()->set("database.connections.mysql.$key", $clientDBs[$client][$idx]);
        }
    }

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
//            return redirect()->route('login')->withCookie(cookie()->forget('token'));
//REMOVE ROUTE PARAMS FROM PRODUCTION - for removing subdomain routing
            return redirect()->route('login',CLIENT)->withCookie(cookie()->forget('token'));
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
                Route::get('/', function () {
//                    return route('base_url');
//REMOVE ROUTE PARAMS FROM PRODUCTION - for removing subdomain routing
                    return route('base_url',CLIENT);
                })->name('base_url');
                Route::post('ping', [APIController::class, 'ping']);
                Route::post('me', function () {
                    return ck();
                });

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

    Route::get('test', function (Request $request) {
        return \Illuminate\Support\Str::of('priceList')->ucfirst()->__toString();
    });

});
