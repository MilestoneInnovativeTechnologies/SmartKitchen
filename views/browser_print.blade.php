@php
    use \Illuminate\Support\Str;
    use \Milestone\SmartKitchen\Models\Model;
    use \Milestone\SmartKitchen\Models\Kitchen;
    //use \Milestone\SmartKitchen\Models\Settings;
        $request = request();
        $page = $request->get('page','bill'); $id = $request->get('id',1); $token = $request->get('token',1);
        $class = Str::replaceLast('Model',Str::title($page),Model::class);
        $model = $class::find($id);
        $data = call_user_func_array([$model,'print_data'],[$model,$token]);
        $fileArray = [];//Settings::where('name','like','_file_%')->get()->mapWithKeys(function($record){ return [Str::replace('_file_','file_',$record->name) => $record->value]; })->toArray();
        $dataArray = $data->toArray(); $data = array_merge($dataArray,$fileArray); extract($data);
@endphp<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Smart Kitchen :: {{ \Illuminate\Support\Str::title($page) }} Print</title>
    <style>
        * { margin: 0; padding: 0; }
    </style>
    @unless(request()->no_print) <script> window.onload = window.print() </script> @endunless
</head>
<body>
@if($request->preview)
    @includeFirst(['SK::print.preview_' . $page,'SK::print.' . $page],compact(...array_keys($data)))
@else
    @include('SK::print.' . $page,compact(...array_keys($data)))
@endif
</body>
</html>
