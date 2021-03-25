<?php

return [

    'domain' => 'sk',

    'role_names' => [
        'Administrator' => 'Administrator',
        'Management' => 'Management',
        'Receptionist' => 'Receptionist',
        'Waiter' => 'Waiter',
        'Chef' => 'Chef'
    ],

    'login_log_section_role_key' => [
        'Waiter' => 'menu',
        'Chef' => 'kitchen'
    ],

    'settings' => [
        // true => kitchens with item having no stock will not consider while auto assigning items to kitchen
        // false => kitchens with item having no stock will also consider while auto assigning items to kitchen
        'consider_stock' => false
    ]


];
