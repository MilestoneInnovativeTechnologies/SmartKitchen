@php
$dev = env('DEV') === 'YES';
$files = json_decode(@file_get_contents(public_path('pack.json')),true);
@endphp
@if($dev)
    <base href="http://127.0.0.1:8080">
    <script src=vendor.js></script>
    <script src=app.js></script>
@else
    @foreach($files['css'] as $type => $file) <link href=css/{{ $type }}.{{ $file }}.css rel=stylesheet> @endforeach
    @foreach($files['js'] as $type => $file) <script src=js/{{ $type  }}.{{ $file }}.js></script> @endforeach
@endif
