@php
$dev = (env('DEV') === 'YES');
$files = [
    'css' => [
        'vendor' => 'd40e81b1',
        'app' => '784fe0af',
    ],
    'js' => [
        'vendor' => '859de9c2',
        'app' => '38a46b9f',
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
