<!DOCTYPE html>
<html>
<head>
    <title>Smart Kitchen :: Print Template</title>
    <script>
        function modelChanged(model){
            document.getElementsByName('token')[0].style.display = model === 'Kitchen' ? 'inline-block' : 'none'
            document.getElementsByName('kot_type')[0].style.display = model === 'Kitchen' ? 'inline-block' : 'none'
            // document.getElementsByName('template_name')[0].style.display = model === 'Kitchen' ? 'inline-block' : 'none'
        }
        function kotChanged(type){
            document.getElementsByName('token_item_ids')[0].style.display = type !== '' ? 'inline-block' : 'none'
        }
    </script>
</head>
<body>
<form method="post" >@csrf
    <select name="model" onchange="modelChanged(this.value)"><option value="Token" @if(request()->input('model') === 'Token') selected @endif>Token</option><option value="Bill" @if(request()->input('model') === 'Bill') selected @endif>Bill</option><option value="Payment" @if(request()->input('model') === 'Payment') selected @endif>Payment</option><option value="Kitchen" @if(request()->input('model') === 'Kitchen') selected @endif>Kitchen</option></select>
    <input type="text" name="id" placeholder="ID" value="{{ request()->input('id',1) }}">
    <input type="submit" name="prepare" value="prepare">
    <input type="text" name="token" placeholder="token id" value="{{ request()->input('token',1) }}" style="display:@if(request()->input('model') !== 'Kitchen') none @endif">
    <select name="kot_type" onchange="kotChanged(this.value)" style="display:@if(request()->input('model') !== 'Kitchen') none @endif"><option value="" @if(request()->input('kot_type') === '') selected @endif></option><option value="Add" @if(request()->input('kot_type') === 'Add') selected @endif>Add</option><option value="Modify" @if(request()->input('kot_type') === 'Modify') selected @endif>Modify</option><option value="Cancel" @if(request()->input('kot_type') === 'Cancel') selected @endif>Cancel</option></select>
    <input type="text" name="token_item_ids" placeholder="token item ids ex: 1,2,3" value="{{ request()->input('token_item_ids') }}" style="display:@if(request()->input('model') !== 'Kitchen' || trim(request()->input('kot_type')) === '') none @endif">
    <table style="width: 100%"><tbody><tr><td style="width: 50%; height: 100%" valign="top"><textarea style="width: 100%" rows="25" name="template">{{ request()->input('template') }}</textarea></td><td valign="top" style="width: 50%; background-color: #000000">@if(request()->getMethod() === 'POST' && request()->filled(['model','id']))
@php
    $class = \Illuminate\Support\Str::of(\Milestone\SmartKitchen\Models\Model::class)->replaceLast('Model',request()->input('model'))->__toString();
    $model = $class::find(request()->input('id')); $template = request()->input('model') === 'Kitchen' ? ('kot'. request()->input('kot_type') .'_print_template') : 'print'; $method = $template . '_data';
    $data = (method_exists($model,$method)) ? call_user_func_array([$model,$method],[$model,request()->input('token'),explode(",",request()->input('token_item_ids','')),request()->input('kot_type','')]) : (method_exists($model,'print_data') ? call_user_func_array([$model,'print_data'],[$model,request()->input('token'),explode(",",request()->input('token_item_ids','')),request()->input('kot_type','')]) : $model);
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