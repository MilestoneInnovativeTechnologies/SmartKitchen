<?php

return [

    'media' => [
        'driver' => 'local',
        'root' => public_path('media'),
        'url' => env('APP_URL').'/media',
        'visibility' => 'public',
    ],

];
