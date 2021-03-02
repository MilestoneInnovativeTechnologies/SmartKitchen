
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

    @php $dev = true @endphp
    @include('SK::inc.styles',['dev' => $dev])
    <script type="text/javascript">
        const DATA = [], BASE_URL = '{{ route('base_url') }}', MEDIA_ROOT = '{{ route('media_root') }}', _ROLE = 'Login', LOGOUT = '{!! route('logout') !!}', LOGIN = '{!! route('login') !!}';
        const LoginSelect = @json(config('sk.login_log_section_role_key'));
        {{--DATA['USERS'] = @json(\Milestone\SmartKitchen\Models\User::select('id','name','role')->get());--}}
        window.onload = function(){ localStorage.removeItem('jwt_TOKEN'); localStorage.removeItem('jwt_SECRET'); }
    </script>
</head>
<body>
@if(request('msg')) <div style="margin-top: 20px; color: darkred; text-align: center; font-weight: bold">{{ request('msg') }}</div>  @endif
<div id="q-app"></div>
@include('SK::inc.scripts',['div' => $dev])
</html>
