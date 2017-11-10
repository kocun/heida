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

4 . Install [bower](http://bowerjs.org/) ``sudo npm -g install bower``

5 . Clone this repo, ``git clone https://github.com/kocun/heida.git``

6 . Enter heida directory ``cd heida``

7 . You must have a **local.js** file which is not included in git repo. This file has sensitive data thus it is no included in git repo. You can create a new one

``touch config/local.js``

8 . And then with your favorite editor you can change your private settings.

```js
module.exports = {
    admins: [{
        email: 'admin1@ku.edu.tr', // Change this for your admins
        email: 'admin2@ku.edu.tr' // Change this for your admins
    }],
    host: '127.0.0.1',  //IP Address to bind server
    port: 8080,  // Port to bind server
    google: {
      clientID: 'Your Google App Client Id Here',
      clientSecret: 'Your Client Secret Here',
      callbackURL: 'http://xxx.yyy.edu.tr:8080/api/auth/google/callback', //Your callback URL here
      scope: ['profile', 'email']
    },
    models: {
      connection: 'mongo' // refers to below
    },
    connections: {
        mongo: {
            adapter: 'sails-mongo', // Mongo Adapter, you may change this to MySQL
            host: '127.0.0.1', // IP Address of your database
            port: 27017, // Port of the MongoDb
            // user: 'username',  // User name of mongodb account.
            // password: 'password', // password of mongodb  account
            database: 'heida' //Name of the database
        }
    }
}
```
**admins** : The email of pre defined admins. These people are always admin and manage the software.

**host** : The IP address of the server which software will run. We usually run it behind a public nginx Server and use 127.0.0.1 to run software which is not available to public.

**port** : Port number to bind.

**google** : Authentication is made by Google so you should create a google app. Basically you can create a new **Web Application** one by [Google API Console](https://console.developers.google.com), then you have a clientId and clientSecret.
**If you want use LDAP structure please see bottom of page.**

**callbackURL** : This is very important part of the software that after a login attempt by the user, google redirects user to this URL where with authentication parameters. This URL must be configured both on Google API Console and this file. This must be a valid URL available to public.

**connections** : Your Database connection declared here.

9 . run ``npm install`` on installed directory. This will install all required libraries.

10 . type ``cd assets`` on installed directory, and then type  ``bower install`` . This will install all client libraries.

11 . ``cd ..`` to your installation directory and  now you are ready to run. Type the following

``sails lift --prod``

Then you should point your browser to http://HOST:PORT


For any [issues or questions](https://github.com/kocun/heida/issues)

## Using LDAP

**/api/services/passport.js** we have arranged the LdapStrategy under the LDAP schema of our university. We also used the **user.Uid** field, so we used the **user.SAMAccountName** field. We have all uid fields sorted by **sAMAccountName**.

```js
passport.use(new LdapStrategy(getLDAPConfiguration,
  function(user, done) {
    process.nextTick(function() {
      findByUsername(user.sAMAccountName, function(err, userdb) {
        if (err) {
          return done(null, err);
        }
        if (!userdb) {
          var usr = {
            username: user.sAMAccountName,
            name: user.fullName,
            password: 'N/A',
            email: user.mail,
            role: 4
          };
          User.create(usr).exec(function(err, created) {
            if (created) {
              return done(null, created);
            }
          });
        }
        else {
          var returnUser = {
            username: userdb.username,
            createdAt: userdb.createdAt,
            id: userdb.id
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        }
      });

    });
    //return done(null, user);
  }
));
```

```js
function getLDAPConfiguration(req, callback) {
  // Fetching things from database or whatever

  process.nextTick(function() {
    var opts = {
      server: {
        url: 'ldap://LDAP_SUNUCU_ADI.aydin.edu.tr:389',
        // bu hesap LDAP'ta arama i?in yetkisi bulunan bir hesap.
        bindDn: 'CN=KULLANICI_ADI,OU=KULLANICININ_BULUNDU?U_OU,DC=aydin,DC=edu,DC=tr',
        bindCredentials: 'KULLANICI_??FRES?',
        searchBase: 'ou=ARAMANIN_BA?LAYACA?I_OU,DC=aydin,DC=edu,DC=tr',
        // yetkilendirilecek kullan?c? i?in ldap sorgusu
        searchFilter: '(sAMAccountName=' + req.body.username + ')'
      }
    };

    callback(null, opts);
  });

};
```

**/assets/views/pages/login.html** comment line When we opened the form to **"/api/auth/process/ldapauth"**, we closed the codeblock related to Google OAuth login.

```html
<div class="container">
  <div class="row">
    <div class="col-lg-4 col-md-4 col-sm-8 col-xs-12 login-content">
      <i class="logo-heida mb40"></i>
          <form role="form" action="/api/auth/process/ldapauth" method="POST">
            <fieldset>
              <div class="form-group">
                <input class="form-control" placeholder="username" name="username" type="username" autofocus>
              </div>
              <div class="form-group">
                <input class="form-control" placeholder="Password" name="password" type="password" value="">
              </div>
              <div class="checkbox">
                <label>
                  <input name="remember" type="checkbox" value="Remember Me">Remember Me
                </label>
              </div>
          </fieldset>
          <input type="submit" id="submit" value="Login"/>
          </form>

          <!-- Change this to a button or input when using this as a form -->

          <!--<select class="form-control mb20" name="lang-selector" ng-change="changeLanguage()" ng-model="selected">
            <<option value="">{{'Choose Language' | translate}}</option>
            <option value="tr" selected>{{'Turkish' | translate}}</option>
            <option value="en">{{'English' | translate}}</option>
            <option value="es">{{'Spanish' | translate}}</option>
            <option value="si">{{'Slovene' | translate}}</option>
          </select>
          <a href="/api/auth/process/ldap" class="btn btn-block btn-social btn-lg btn-google">
            <i class="fa fa-google"></i> {{"Sign in with Google" | translate}}
          </a>-->
        <br /><br />
          This is a test version of the Heida tool for collecting and sharing internationalization indicators. You can only login with a Google account. Once it is installed in your university, you and others can use your university email addresses. For more information visit <a href="https://heida.ku.edu.tr">Heida</a> or email us at <a href="mailto:heida@ku.edu.tr">heida@ku.edu.tr</a>
        </div>
      </div>
    </div>
```