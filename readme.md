## Installation

1. Install laravel
1. cd project
1. composer require milestone/smartkitchen
1. update `APP_URL` in env file
1. set db params in env file
1. make email field length to 64 of users,password_resets in base migration
1. make uuid field length to 191 of failed_jobs in base migration
1. update time zone
1. run `vendor:publish`
1. modify setting in `sk.php` if necessary
1. php artisan migrate
