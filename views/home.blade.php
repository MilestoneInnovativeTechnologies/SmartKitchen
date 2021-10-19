
<!DOCTYPE html>
<html>
<head>
    <title>Smart Kitchen</title>

    <meta charset="utf-8">
    <meta name="description" content="Kitchen Order Token as its simple way">
    <meta name="format-detection" content="telephone=no">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">

    <link rel="icon" type="image/png" sizes="128x128" href="icons/favicon-128x128.png">
    <link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png">
    <link rel="icon" type="image/ico" href="favicon.ico">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-828x1792.png">
    <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="icons/apple-launch-1125x2436.png">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="icons/apple-launch-1242x2688.png">
    <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-750x1334.png">
    <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="icons/apple-launch-1242x2208.png">
    <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-640x1136.png">
    <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-1536x2048.png">
    <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-1668x2224.png">
    <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-1668x2388.png">
    <link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-2048x2732.png">

    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('Customer') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('ItemProp') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('Item') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('ItemGroup') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('Menu') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('PriceList') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('Price') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('Kitchen') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('KitchenItem') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('Seating') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('Tax') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('User') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('Settings') !!}"></script>

    <link rel=manifest href=manifest.json>
    <meta name=theme-color content=#1976d2>
    <meta name=apple-mobile-web-app-capable content=yes>
    <meta name=apple-mobile-web-app-status-bar-style content=default>
    <meta name=apple-mobile-web-app-title content="Smart Kitchen">

    <link rel=apple-touch-icon href=icons/apple-icon-120x120.png>
    <link rel=apple-touch-icon sizes=152x152 href=icons/apple-icon-152x152.png>
    <link rel=apple-touch-icon sizes=167x167 href=icons/apple-icon-167x167.png>
    <link rel=apple-touch-icon sizes=180x180 href=icons/apple-icon-180x180.png>

    <link rel=mask-icon href=icons/safari-pinned-tab.svg color=#1976d2>
    <meta name=msapplication-TileImage content=icons/ms-icon-144x144.png>
    <meta name=msapplication-TileColor content=#000000>

    @php \Milestone\SmartKitchen\Jobs\InitializeCache::dispatch() @endphp
    <script>
        const DATA = [], BASE_URL = '{{ route('base_url') }}', MEDIA_ROOT = '{{ route('media_root') }}', _COMPANY = '{{ sk('company') }}', _BRANCH = '{{ sk('branch_code') }}', _ROLE = '{{ auth()->user()->role }}', LOGOUT = '{!! route('logout') !!}', LOGIN = '{!! route('login') !!}';
        const _USER = @json(auth()->user()), _SECTION = @json(\Illuminate\Support\Arr::get(auth()->user(),'Log.section',[])), _TIME = {{ time() }};
        const _KEY = '{{ sk('client_key') }}', _CODE = '{!! \Milestone\SmartKitchen\Controllers\SubscriptionController::code() !!}';
    </script>
</head>
<body style="overscroll-behavior-y: contain">
<div id="q-app"></div>
@include('SK::inc.includes')
</html>
