<?php

return [

    'client_key' => env('CLIENT_KEY'),

    'domain' => 'sk',

    'timezone' => 'Asia/Kolkata',

    'role_names' => [
        'Administrator' => 'Administrator',
        'Receptionist' => 'Receptionist',
        'Waiter' => 'Waiter',
        'Chef' => 'Chef',
        'Delivery Boy' => 'Delivery Boy',
    ],

    'login_log_section_role_key' => [
        'Waiter' => 'menu',
        'Chef' => 'kitchen'
    ],

    /*
     * Data will be fetched for these no of days only
     */
    'recent_days_length' => 10,

    'settings' => [
        // true => kitchens with item having no stock will not consider while auto assigning items to kitchen
        // false => kitchens with item having no stock will also consider while auto assigning items to kitchen
        'consider_stock' => false
    ],

];
