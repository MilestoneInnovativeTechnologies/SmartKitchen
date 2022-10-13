@php
if(request()->method() === 'POST'){
    $template = \request('template'); $page = \request('page','bill');
    $preview_file = resource_path('views/vendor/SK/print/preview_' . $page . '.blade.php');
    if(!realpath($preview_file) && !realpath(dirname($preview_file))) mkdir(dirname($preview_file),0777,true);
    $fp = fopen($preview_file,'w'); fwrite($fp,$template); fclose($fp);
    if(\request('save')) {
        $file = resource_path('views/vendor/SK/print/' . $page . '.blade.php');
        if(!realpath($file) && !realpath(dirname($file))) mkdir(dirname($file),0777,true);
        $fp = fopen($file,'w'); fwrite($fp,$template); fclose($fp);
        \Illuminate\Support\Facades\Artisan::call('view:cache');
    }
}
@endphp
@php
    use \Illuminate\Support\Str;
    use \Milestone\SmartKitchen\Models\Model;
    use \Milestone\SmartKitchen\Models\Kitchen;
    //use \Milestone\SmartKitchen\Models\Settings;
        $request = request();
        $page = $request->get('page','bill'); $req_token = $request->get('id',1); $req_id = $page === 'kitchen' ? $request->get('kitchen',1) : $req_token;
        $class = Str::replaceLast('Model',Str::title($page),Model::class);
        $model = $class::find($req_id);
        $data = call_user_func_array([$model,'print_data'],[$model,$req_token]);
        $fileArray = [];//Settings::where('name','like','_file_%')->get()->mapWithKeys(function($record){ return [Str::replace('_file_','file_',$record->name) => $record->value]; })->toArray();
        $dataArray = $data->toArray(); $data = array_merge($dataArray,$fileArray); extract($data);
@endphp<!DOCTYPE html>
<html>
<head>
    <title>Smart Kitchen :: Browser Print Template</title>
    <script>
    </script>
</head>
<body>
Browser Print Template Manufacturing Area!!
<form>
<select name="page"><option value="bill" @if($page === 'bill') selected @endif>Bill</option><!--<option value="payment" @if($page === 'payment') selected @endif>Payment</option>--><option value="kitchen" @if($page === 'kitchen') selected @endif>Kitchen/KOT</option></select>
<input type="text" name="id" placeholder="id" value="{{ $request->id }}">
<select name="kitchen">@foreach(Kitchen::all() as $kitchen) <option value="{{ $kitchen->id }}" @if($request->kitchen == $kitchen->id) selected @endif>{{ $kitchen->name }}</option> @endforeach</select>
<input type="submit" value="Prepare">
</form>
@if(request('page'))
    <form action="" method="post"><input type="hidden" name="page" value="{{ $page  }}">
        <table style="width: 100%">
            <tr>
                <td rowspan="2" style="width: 25%" valign="top">@if(request('id'))<div style="height:80vh">@dump($data)</div>@endif</td>
                <td style="width: 35%" valign="top">
                    @php
                    $path = resource_path('views/vendor/SK/print/'); $package_path = 'milestone/smartkitchen/views/print/'; $vendor_path = base_path('vendor/' . $package_path); $dev_path = base_path($package_path);
                    $name = request('page') . '.blade.php'; $files = [$path . 'preview_' . $name,$path . $name,$vendor_path . $name,$dev_path . $name];
                    foreach($files as $file){
                        if(realpath($file)){
                            $template = file_get_contents($file);
                            break;
                        }
                    }
                    @endphp
                    <textarea name="template" style="width: 98%;  height:75vh"  rows="10">{!! $template !!}</textarea>
                </td>
                <td style="width: 40%" valign="top">
                    <iframe src="{!! route('browser_print',['no_print' => 1, 'preview' => 1, 'page' => $page, 'id' => $req_id, 'token' => $req_token]) !!}" style="width: 100%; height: 75vh"></iframe>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="submit" name="save" value="Save" style="margin-right: 35%">
                    <input type="submit" name="preview" value="Preview" style="padding: 10px 30px">
                </td>
            </tr>
        </table>
    </form>
@endif
<form action="post">

</form>
</body>
</html>