<?php

return [

    'sk' => [
        'driver' => 'daily',
        'path' => storage_path('logs/SmartKitchen.log'),
        'level' => 'debug',
        'days' => 14,
        'tap'   => [\Milestone\SmartKitchen\Logging\LoggingFormatter::class]
    ],

];
