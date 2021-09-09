<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Smart Kitchen :: Subscription Details</title>
</head>
<body style="margin: 0px">
@php
$code = \Illuminate\Support\Facades\Storage::get('subscription');
$array = stripos($code,"/") ? json_decode(base64_decode(explode("/",$code)[1]),true) : [];
@endphp
<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh">
    <div style="width: 360px; max-width: 90vw; background-color: #EEEEEE; padding: 40px 10px; color: #565656; text-align: center; border-radius: 25px; border: 5px double #CCCCCC">
        <div style="font-weight: bold">Company</div>
        <div style="margin-bottom: 8px">{{ $array['client'] ?? '' }}</div>
        <div style="font-weight: bold">Branch</div>
        <div style="margin-bottom: 8px">{{ $array['branch'] ?? '' }}</div>
        <div style="font-weight: bold">Subscription Package</div>
        <div style="margin-bottom: 8px">{{ $array['sub'] ?? '' }}</div>
        <div style="font-weight: bold">Subscription Valid Till</div>
        <div style="margin-bottom: 8px">{{ $array['end'] ?? '' }}</div>
        <div style="margin-top: 15px; color: #1D1D1D; font-weight: bold">Remaining: {{ \Illuminate\Support\Carbon::parse($array['end'] ?? time()+10)->fromNow() }}</div>
    </div>
    <div style="width: 360px; max-width: 90vw; margin-top: 10px;">
        <form method="post">
            <input type="submit" name="delete" value="Delete Subscription" style="padding: 5px 40px; border-radius: 5px" />
            <input type="submit" name="login" value="Go to Login" style="padding: 5px 40px; border-radius: 5px" />
            @if(\Illuminate\Support\Facades\Storage::exists('subscription.undo'))
                <input type="submit" name="undo" value="Undo last subscription" style="margin-top:5px; width: 100%; padding: 5px 40px; border-radius: 5px" />
            @endif
        </form>
    </div>
    <form method="post" action="subscribe">
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 10px">
            <div style="width: 360px; max-width: 90vw; background-color: #EEEEEE; padding: 10px; text-align: center">
                <input type="hidden" name="key" value="{!! sk('client_key') !!}" />
                <textarea name="code" style="width: 85%; height: 200px; margin-top: 5px; border: 2px solid #CCCCCC; border-radius: 10px; padding: 10px 8px; text-align: center" placeholder="PASTE NEW SUBSCRIPTION CODE HERE"></textarea>
                <input type="submit" value="ADD NEW SUBSCRIPTION" style="width: 85%; padding: 10px 1px; margin-top: 1px; border-radius: 3px; background-color: #FFF; border: 2px solid #CCCCCC" name="submit" />
            </div>
        </div>
    </form>
</div>
<script type="text/javascript">
    window.onload = function(){
        localStorage.setItem('key','{{ env('CLIENT_KEY') }}')
        localStorage.setItem('code','{{ \Illuminate\Support\Facades\Storage::get('subscription') }}')
    }
</script>

</body>
</html>