<!DOCTYPE html>
<html>
<head>
    <title>Smart Kitchen :: Print Template</title>
</head>
<body>
<form method="post" >@csrf
    <select name="model"><option value="Token" @if(request()->input('model') === 'Token') selected @endif>Token</option><option value="Bill" @if(request()->input('model') === 'Bill') selected @endif>Bill</option><option value="Payment" @if(request()->input('model') === 'Payment') selected @endif>Payment</option><option value="Kitchen" @if(request()->input('model') === 'Kitchen') selected @endif>Kitchen</option></select>
    <input type="text" name="id" placeholder="ID" value="{{ request()->input('id') }}">
    <input type="text" name="template_name" placeholder="Template Name" value="{{ request()->input('template_name') }}">
    <input type="submit" name="prepare" value="prepare">
    <table style="width: 100%"><tbody><tr><td style="width: 50%; height: 100%" valign="top"><textarea style="width: 100%" rows="25" name="template">{{ request()->input('template') }}</textarea></td><td valign="top" style="width: 50%; background-color: #000000">@if(request()->getMethod() === 'POST' && request()->filled(['model','id']))
@php
    $class = \Illuminate\Support\Str::of(\Milestone\SmartKitchen\Models\Model::class)->replaceLast('Model',request()->input('model'))->__toString();
    $model = $class::find(request()->input('id')); $method = request()->input('template_name') . '_data';
    $data = (method_exists($model,$method)) ? call_user_func_array([$model,$method],[$model]) : (method_exists($model,'print_data') ? call_user_func_array([$model,'print_data'],[$model]) : $model);
    dump(is_array($data) ? $data : $data->toArray())
@endphp
    @endif</td></tr></tbody></table>
    <input type="text" name="printer" placeholder="Printer" value="{{ request()->input('printer') }}"> <input type="submit" name="print" value="print">
</form>
</body>
</html>
@if(request()->getMethod() === 'POST' && request()->filled(['template','printer','print'])) @php
\Milestone\SmartKitchen\Printer::do(request('printer'),json_decode(request('template'),true),is_array($data) ? $data : $data->toArray())
@endphp @endif