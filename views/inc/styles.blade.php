@php
  $files = ['vendor.de99a180','app.0e433876'];
@endphp
@if(isset($dev) && $dev)
    <base href="http://sk:8080">
    <link href=css/vendor.de99a180.css rel=stylesheet>
    <link href=css/app.0e433876.css rel=stylesheet>
@else
    @foreach($files as $file)
        <link href=css/{{ $file }}.css rel=stylesheet>
    @endforeach
@endif
