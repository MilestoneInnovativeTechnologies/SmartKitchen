## Installation

1. Install laravel
2. cd project
3. composer require milestone/smartkitchen
4. update `APP_URL` in env file
5. set db params in env file
6. make email field length to 64 of users,password_resets in base migration
7. make uuid field length to 191 of failed_jobs in base migration
8. php artisan `vendor:publish`
9. set config > sk.php > domain properly
10. set config > sk.php > time zone
11. modify other setting in `sk.php` if necessary
12. php artisan migrate
13. php artisan jwt:secret
14. add line `MEDIA_DISK=media` to .env file
15. comment every routes in web.php

#### Subscription
##### Device
get the serial key of device, add branch at milestoneit.net
##### Cloud & PC
set a web serial in milestoneit.net and give the same at config > sk.php > web_serial = `SERIAL`


### By default a login is created for admin. Pin: 0000, Login: admin, Password: password
#### it is requested to add company name and location in settings

## Configuration

1. set printers

### SMS Gateway
This should be enabled in subscription. Once this enabled, admin portal will have menu for creating templates. More details are mentioned in sms doc