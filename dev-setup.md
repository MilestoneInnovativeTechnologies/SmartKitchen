Create Laravel and Clone smartkitchen code from github into appropriate folder <br />
`laravel new SK && cd SK && mkdir milestone && cd milestone && git clone https://github.com/MilestoneInnovativeTechnologies/SmartKitchen.git smartkitchen && cd .. && composer require spatie/laravel-medialibrary doctrine/dbal tymon/jwt-auth guzzlehttp/guzzle mike42/escpos-php`

Add following entries in composer.json<br />
`"Milestone\\SmartKitchen\\": "milestone/smartkitchen/src"`<br />
to autoload -> psr-4<br /><br />

`"files": ["milestone/smartkitchen/helpers.php"]`<br />
to autoload<br /><br />

Add an entry<br />
`Milestone\SmartKitchen\SmartKitchenServiceProvider::class,`<br />
to config -> app -> providers<br /><br />

Create DB<br />
Set DB Params in env<br />
update APP_URL in env file<br />
make email field length to 64 of users,password_resets in base migration<br />
make uuid field length to 191 of failed_jobs in base migration<br />
php artisan vendor:publish<br />
set config > sk.php > domain properly<br />
set config > sk.php > time zone<br /><br />

php artisan migrate && php artisan jwt:secret<br />
add following lines to .env file<br />
MEDIA_DISK=media<br />
DEMO_SERIAL=1000000000000001<br />
comment every routes in web.php<br /><br />

Visit the sk domain<br />
Provide Client Key<br />
`228dee9e18276a876ba48c790f9b94cc720111`
Provide Subscription Code<br />
`05016adb3aea55de6ee67210f429e7a69117672011gh1d11820c477c9929282927b038f98354005799/eyJjbGllbnQiOiJNaWxlc3RvbmUiLCJicmFuY2giOiJERU1PU0VSSUFMIiwiZWRpdGlvbiI6IkN1c3RvbSIsImNsaWVudF9jb2RlIjoiTUlUIiwiYnJhbmNoX2NvZGUiOiJETVNSTCIsImV4cGlyeSI6IjIwMjUtMTItMzEgMjM6NTk6NTkifQ==`<br /><br />

The code is ready now, For development preparation, follow below steps<br />
run one by one<br />
`milestone\smartkitchen\init.bat`<br />
`npm install`<br /><br />

####For doing development, add below line in .env
`DEV=YES`<br />
then run<br />
`npm run dev`<br />
Then visit page<br /><br />

####Once ready to build, then run
`npm run build`<br /><br />

####If ready to test the build, then remove line
DEV=YES or make `DEV=NO`<br />
Then visit page...<br /><br />

Once done development, before building, increment the version in package.json<br />
And **commit**, **push** to _github_