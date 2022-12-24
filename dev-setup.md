Create Laravel and Clone smartkitchen code from github into appropriate folder <br />
`laravel new SK && cd SK && mkdir milestone && cd milestone && git clone https://github.com/MilestoneInnovativeTechnologies/SmartKitchen.git smartkitchen && cd .. && composer require spatie/laravel-medialibrary doctrine/dbal hisorange/browser-detect guzzlehttp/guzzle mike42/escpos-php tymon/jwt-auth:dev-develop`

Add following entries in composer.json<br />
`"Milestone\\SmartKitchen\\": "milestone/smartkitchen/src"` to autoload -> psr-4

`"files": ["milestone/smartkitchen/helpers.php"]` to autoload<br />

Add an entry<br />
`Milestone\SmartKitchen\SmartKitchenServiceProvider::class,`<br />
to config -> app -> providers<br />

Create DB<br />
Set DB Params in env<br />
update _APP_URL_ in **.env** file<br />
make _email_ field length to 64 of **users,password_resets** in base migration<br />
make _uuid_ field length to 191 of **failed_jobs** in base migration<br />
`composer dump-autoload`<br />
`php artisan vendor:publish`<br />
set **config** > **sk.php** > `domain`<br />
set **config** > **sk.php** > `timezone`<br /><br />
Migrate Database and add api key<br />
`php artisan migrate && php artisan jwt:secret`<br />

It is expecting a line in **.env** file like <br />
JWT_SECRET=64_length_characters<br />
If tymon/jwt-auth:dev-develop is what required for this project, this line wouldn't be there. So add this line manually with the 64_length_characters we will get from cmd once the above command `php artisan jwt:secret` is executed<br />

add following lines to **.env** file<br />
_MEDIA_DISK=media_<br />
_DEMO_SERIAL=1000000000000001_<br /><br />
comment every routes in **web.php**<br /><br />

Visit the sk domain<br />
Provide Client Key<br />
`228dee9e18276a876ba48c790f9b94cc720111`<br />
Provide Subscription Code<br />
`05016adb3aea55de6ee67210f429e7a69117672011gh1d11820c477c9929282927b038f98354005799/eyJjbGllbnQiOiJNaWxlc3RvbmUiLCJicmFuY2giOiJERU1PU0VSSUFMIiwiZWRpdGlvbiI6IkN1c3RvbSIsImNsaWVudF9jb2RlIjoiTUlUIiwiYnJhbmNoX2NvZGUiOiJETVNSTCIsImV4cGlyeSI6IjIwMjUtMTItMzEgMjM6NTk6NTkifQ==`<br /><br />

The code is ready now, For development preparation, follow below steps<br />
run one by one<br />
`milestone\smartkitchen\init.bat`<br />
`npm install`<br /><br />

For doing development, add below line in **.env**<br />
`DEV=YES`<br />
then run<br />
`npm run dev`<br />
Then visit page<br /><br />

Once ready to build, then run<br />
`npm run build`<br /><br />

If ready to test the build, then remove line
DEV=YES or make `DEV=NO`<br />
Then visit page...<br /><br />

Once done development, before building, increment the version in package.json<br />
And **commit**, **push** to _github_
