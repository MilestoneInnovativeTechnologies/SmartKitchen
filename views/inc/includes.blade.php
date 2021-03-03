@php
$dev = (env('DEV') === 'YES');
$files = [
    'css' => [
        'vendor' => 'de021c1d',
        'app' => 'c92803ba',
    ],
    'js' => [
        'vendor' => '742b896a',
        'app' => 'f646015a',
    ]
]
@endphp
@if($dev)
    <base href="http://sk:8080">
    <script src=vendor.js></script>
    <script src=app.js></script>
@else
    @foreach($files['css'] as $type => $file) <link href=css/{{ $type }}.{{ $file }}.css rel=stylesheet> @endforeach
    @foreach($files['js'] as $type => $file) <script src=js/{{ $type  }}.{{ $file }}.js></script> @endforeach
@endif
