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
1. set config > sk.php > domain properly
1. modify other setting in `sk.php` if necessary
1. php artisan migrate
1. php artisan jwt:secret
1. add line `MEDIA_DISK=media` to .env file

### By default a login is created for admin. Pin: 0000, Login: admin, Password: password
#### it is requested to add company name and location in settings

## Configuration

1. Add company name,location details in admin
1. set printers