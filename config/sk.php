<?php

return [

    'domain' => 'sk',

    'timezone' => 'Asia/Kolkata',

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
    ],

    /*
     * Server url. If this branch belongs to a network of companies having cloud kitchen facility,
     * then there will be a centralized server somewhere. That server address need to be given here
     */
    'server' => 'http://sk',

    /*
     * A string of maximum 12 chars, which indicates the location of this branch.. It should be unique among the entire company
     */
    'location' => 'SKLOC01',

    /*
     * Synchronizing cloud details
     * Delay between each syncing.
     * In Seconds
     */
    'sync_delay' => 15,

    /*
     * Maximum no. of retries for failed sync transfer
     */
    'sync_retry' => 2,

];
