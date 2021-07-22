1. Do copy firebase configuration of real db to boot/remote.js
1. Commit required changes
1. Push commits
1. Quasar Build
1. Copy compiled css,js files from quasar dist folder, to package asset folder. (Delete folder and paste)
1. Copy icons,media,fonts if any changes
1. Change DEV to NO in env file
1. Update vendor,app of css,js in views/inc/includes from index.html 
1. Commit and Push assets
###### Do release at github

#### Demo domain changes
In route, initial ```$clientDBs``` and ```If``` conditions are choosing DB according to visitor subdomain.

setClient static method in SmartKitchenServiceProvider is for setting client from host and `sk.domain` config file
Its calling from register method of this class.

Add last line of setClient method in SmartKitchenServiceProvider
```config()->set("sk.branch_code",CLIENT);```
is for setting branch code according to visitor subdomain.
