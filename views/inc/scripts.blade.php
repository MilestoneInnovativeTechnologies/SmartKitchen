@php
    $files = ['vendor.876a95c1','app.6870eb7d'];
@endphp
@if(isset($dev) && $dev)
    <script src=vendor.js></script>
    <script src=app.js></script>
@else
    @foreach($files as $file)
        <script src=js/{{ $file }}.js></script>
    @endforeach
@endif
