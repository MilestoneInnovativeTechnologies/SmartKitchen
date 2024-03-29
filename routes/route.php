<?php

use Illuminate\Support\Facades\Route;
use \Illuminate\Http\Request;
use \Milestone\SmartKitchen\Controllers\AuthController;
use \Milestone\SmartKitchen\Controllers\UserController;
use \Milestone\SmartKitchen\Controllers\APIController;
use \Milestone\SmartKitchen\Controllers\AssetController;
use \Milestone\SmartKitchen\Controllers\MediaController;
use \Milestone\SmartKitchen\Controllers\DataController;
use \Milestone\SmartKitchen\Controllers\SubscriptionController;
use \Milestone\SmartKitchen\Controllers\SettingsController;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenAction;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenGuest;
use \Milestone\SmartKitchen\Middlewares\SmartKitchenAuth;
use \Milestone\SmartKitchen\Middlewares\ClientKey;
use \Milestone\SmartKitchen\Middlewares\APIRequest;

Route::group([
    'middleware' => 'cache.headers:public;max_age=2628000;etag',
], function () {
    Route::get('assets/online/menu.js', [AssetController::class, 'OnlineMenuAssets']);
    Route::get('assets/{time}/{model}.js', [AssetController::class, 'JSAsset'])->name('asset');
    Route::get('uploads/{file}', [AssetController::class, 'UploadedFile']);
});

Route::group([
    'middleware' => ['api'],
], function () {

    Route::group([
        'middleware' => [SmartKitchenGuest::class],
    ], function () {
        Route::group([
            'middleware' => [ClientKey::class],
        ],function(){
            Route::view('login', 'SK::login')->name('login');
            Route::post('login', [AuthController::class, 'login']);
        });
        Route::post('subscribe', [SubscriptionController::class, 'subscribe']);
        Route::post('subscription/serial',[SubscriptionController::class, 'device_serial']);
        Route::post('subscription/key',[SubscriptionController::class, 'key']);
        Route::view('subscription','SK::subscription')->name('subscription');
        Route::post('subscription',[SubscriptionController::class, 'action']);

        Route::post('out/ping',[APIController::class, 'out_ping'])->name('out_ping');
        Route::post('out/{table}',[AssetController::class, 'records']);
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
        Route::view('home', 'SK::pre_home')->name('pre_home');

        Route::group([
            'prefix' => 'api/v1'
        ], function () {
            Route::get('/', function () { return route('base_url'); })->name('base_url');
            Route::post('me', function () { return ck(); });
            Route::post('ping', [APIController::class, 'ping']);

            Route::group([
                'middleware' => [APIRequest::class, SmartKitchenAction::class],
            ], function () {
                Route::post('{item}/records', [AssetController::class, 'records'])->withoutMiddleware(SmartKitchenAction::class);
                Route::post('{item}/{action}', [APIController::class, 'ping']);
            });

        });

        Route::group([
            'prefix' => 'media'
        ], function () {
            Route::get('/', function () { return ''; })->name('media_root');//boot/axios is using instead of data_root
            Route::post('remove', [MediaController::class, 'remove']);
            Route::post('upload', [MediaController::class, 'upload']);
            Route::post('file_upload', [SettingsController::class, 'file_upload']);
            Route::post('file_remove', [SettingsController::class, 'file_remove']);

        });

        Route::group([
            'prefix' => 'data',
        ], function () {
            Route::get('/', function () { return ''; })->name('data_root');//boot/axios not using instead uses media_root
            Route::get('download_import_template',[DataController::class,'download_import_template']);
            Route::post('import',[DataController::class,'import']);
        });

    });
});

Route::view('menu','SK::menu');

Route::any('print',function(){ return view('SK::print'); });
Route::any('print2',function(){ return view('SK::print2'); });
Route::get('browser_print',function(){ return view('SK::browser_print'); })->name('browser_print');

