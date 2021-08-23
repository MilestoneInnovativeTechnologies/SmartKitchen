<?php

return [

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

    /*
     * Company name. This is mandatory for having remote kitchen facility
     */
    'company' => 'MIT',

    /*
     * This code is identified as location code if remote kitchen is enabled
     */
    'branch_code' => 'CKD',

    /*
     * The root key of firebase firestore where the remote kitchens,tokens reference to be kept
     * This is applicable only if remote order is needed
     */
    'remote_reference' => 'P39AWPWqWJ2Sdh4nM621',

];
