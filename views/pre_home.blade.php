<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="refresh" content="0;url={{ route('home') }}" />
    <title>Smart Kitchen</title>
    <script type="text/javascript">
        window.onload = function(){
            localStorage.setItem('jwt_SECRET','{{ str_replace(['a','e','i','o','u'],['%','#','$','|','@'],env('JWT_SECRET')) }}')
            localStorage.setItem('jwt_TOKEN',new URLSearchParams(document.location.search.substring(1)).get('token'))
            localStorage.setItem('remote_reference','{{ sk('remote_reference') }}')
            localStorage.setItem('serial','{!! \Milestone\SmartKitchen\Controllers\SubscriptionController::serial() !!}')
        }
    </script>
</head>
<body>

</body>
</html>