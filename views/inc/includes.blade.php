@php
$dev = (env('DEV') === 'YES');
$files = [
    'css' => [
        'vendor' => 'cc2d5690',
        'app' => 'e3385c90',
    ],
    'js' => [
        'vendor' => 'd6eab039',
        'app' => '169173b8',
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