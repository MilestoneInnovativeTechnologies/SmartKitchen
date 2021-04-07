
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

    @php cache()->put(ck(),'2000-01-01 00:00:01',now()->addDays(7)) @endphp
    <script>
        const DATA = [], BASE_URL = '{{ route('base_url') }}', MEDIA_ROOT = '{{ route('media_root') }}', _ROLE = '{{ auth()->user()->role }}', LOGOUT = '{!! route('logout') !!}', LOGIN = '{!! route('login') !!}';
        const _USER = @json(auth()->user()), _SECTION = @json(auth()->user()->Log->section);
    </script>
</head>
<body>
<div id="q-app"></div>
@include('SK::inc.includes')
</html>
