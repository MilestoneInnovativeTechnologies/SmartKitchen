
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

    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('Menu') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('Kitchen') !!}"></script>
    <script src="{!! \Milestone\SmartKitchen\Controllers\AssetController::AssetRoute('User') !!}"></script>

    <script type="text/javascript">
        const DATA = [], BASE_URL = '{{ route('base_url',CLIENT) }}', MEDIA_ROOT = '{{ route('media_root',CLIENT) }}', _ROLE = 'Login', LOGOUT = '{!! route('logout',CLIENT) !!}', LOGIN = '{!! route('login',CLIENT) !!}';
        const LoginSelect = @json(config('sk.login_log_section_role_key'));
        window.onload = function(){ localStorage.removeItem('jwt_TOKEN'); localStorage.removeItem('jwt_SECRET'); }
    </script>
</head>
<body>
@if(request('msg')) <div style="margin-top: 20px; color: darkred; text-align: center; font-weight: bold">{{ request('msg') }}</div>  @endif
<div id="q-app"></div>
@include('SK::inc.includes')
</html>
