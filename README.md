# HEIDA Project

**HEIDA** refers to "**Data driven decision making for internationalization of higher education: Bridging the gap between faculty and admin using effective communication platforms**"


Application is build entirely on [Sails.js](http://sailsjs.org/) on top of [Node.js](https://nodejs.org).

Sails.js supports MySql, Postgres and MongoDB so it should work on these Database platforms. Project is mainly tested on MongoDB so it is recommended but others should work.

**Platform**

All technologies used in this project are cross platform. So it should work on any platform. The project is tested on MacOS and Linux but never in Windows.


**Installation**

This guide follows installation on Linux and MacOS needs some work on Windows. Contributions are welcome.

***Prerequisites***

1 . Install [MongoDb Community Server](https://www.mongodb.com/download-center?jmp=nav#community), for binary installation follow the directions on the [MongoDb Manual] (https://docs.mongodb.com/manual/administration/install-community/)
**If you want to use your own MongoDb skip this.**
.

2 . Install [Node.js](https://nodejs.org/en/download/current/). If you want to use Package Manager follow the [directions](https://nodejs.org/en/download/package-manager/).

3 . Install [sailsjs](http://sailsjs.org/) ``sudo npm -g install sails``

4 . Clone this repo, ``git clone https://github.com/kocun/heida.git``

5 . Enter heida directory ``cd heida``

6 . You must have a **local.js** file which is not included in git repo. This file has sensitive data thus it is no included in git repo. You can create a new one

``touch config/local.js``

7 . And then with your favorite editor you can change your private settings.

```
module.exports = {
    admins: [{
        email: 'admin1@ku.edu.tr',
        email: 'admin2@ku.edu.tr'
    }],
    host: '127.0.0.1',
    port: 8080,
    google: {
      clientID: 'Your Google App Client Id Here',
      clientSecret: 'Your Client Secret Here',
      callbackURL: 'http://heida.test.ku.edu.tr:8080/api/auth/google/callback',
      scope: ['profile', 'email']
    },
    models: {
      connection: 'mongo'
    },
    connections: {
        mongo: {
            adapter: 'sails-mongo',
            host: '127.0.0.1',
            port: 27017,
            // user: 'username',
            // password: 'password',
            database: 'heida'
        }
    }
}
```
**admins** : The email of pre defined admins. These people are always admin and manage the software.

**host** : The IP address of the server which software will run. We usually run it behind a public nginx Server and use 127.0.0.1 to run software which is not available to public.

**port** : Port number to bind.

**google** : Authentication is made by Google so you should create a google app. Basically you can create a new **Web Application** one by [Google API Console](https://console.developers.google.com), then you have a clientId and clientSecret.  

**callbackURL** : This is very important part of the software that after a login attempt by the user, google redirects user to this URL where with authentication parameters. This URL must be configured both on Google API Console and this file. This must be a valid URL available to public.

**connections** : Your Database connection declared here. 

8 . Now you are ready to run. Type the following

``sails lift``

Then you should point your browser to http://HOST:PORT


For any [issues or questions](https://github.com/kocun/heida/issues) 

