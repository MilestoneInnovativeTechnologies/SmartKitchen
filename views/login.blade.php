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
        const DATA = [], BASE_URL = '{{ route('base_url') }}', MEDIA_ROOT = '{{ route('media_root') }}', _ROLE = 'Login', LOGOUT = '{!! route('logout') !!}', LOGIN = '{!! route('login') !!}';
        const LoginSelect = @json(config('sk.login_log_section_role_key')), _TIME = {{ time() }};
        window.onload = function(){ localStorage.removeItem('jwt_TOKEN'); localStorage.removeItem('jwt_SECRET'); }
    </script>
</head>
<body>
@if(!sk('client_key') || !\Illuminate\Support\Facades\Storage::exists('subscription'))
    <form method="post" action="subscribe">
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 90vh">
            <div style="width: 360px; max-width: 90vw; background-color: #FFFFFF; padding: 10px; text-align: center">
                <input name="key" type="text" style="width: 80%; height:45px; border-radius: 10px; border: 2px solid #CCCCCC; padding: 5px 8px; text-align: center; background-color: #FEFEFE" placeholder="PLEASE PROVIDE CLIENT KEY" value="{!! sk('client_key') !!}" />
                <textarea name="code" style="width: 85%; height: 200px; margin-top: 5px; border: 2px solid #CCCCCC; border-radius: 10px; padding: 10px 8px; text-align: center; background-color: #FEFEFE" placeholder="PASTE SUBSCRIPTION CODE"></textarea>
                <input type="submit" value="SUBMIT" style="width: 85%; padding: 10px 1px; margin-top: 1px; border-radius: 3px; background-color: #FFF; border: 2px solid #CCCCCC" name="submit" />
            </div>
        </div>
    </form>
@else
<div id="q-app"></div>
@include('SK::inc.includes')
@endif
</body>
</html>
