@php
    $files = ['vendor.46ef27fc','app.99fd7eec'];
@endphp
@if(isset($dev) && $dev)
    <script src=vendor.js></script>
    <script src=app.js></script>
@else
    @foreach($files as $file)
        <script src=js/{{ $file }}.js></script>
    @endforeach
@endif
