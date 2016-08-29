var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  LdapStrategy = require('passport-ldapauth').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  bcrypt = require('bcrypt');

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function(err, user) {
    done(err, user);
  });
});

function findById(id, fn) {

  User.findOne(id).exec(function(err, user) {

    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

function findByUsername(u, fn) {

  User.findOne({
    username: u
  }).exec(function(err, user) {
    // Error handling
    if (err) {
      return fn(null, null);
      // The User was found successfully!
    } else {
      return fn(null, user);
    }
  });
}
// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("local");
    // asynchronous verification, for effect...
    process.nextTick(function() {
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err)
          return done(null, err);
        if (!user) {
          return done(null, false, {
            message: 'Unknown user ' + username
          });
        }
        bcrypt.compare(password, user.password, function(err, res) {
          if (!res)
            return done(null, false, {
              message: 'Invalid Password'
            });
          var returnUser = {
            username: user.username,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        });
      })
    });
  }
));

passport.use(new LdapStrategy(getLDAPConfiguration,
  function(user, done) {

    process.nextTick(function() {

      findByUsername(user.uid, function(err, userdb) {

        if (err)
          return done(null, err);
        if (!userdb) {
          var usr = {
            username: user.uid,
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
        } else {
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

function getLDAPConfiguration(req, callback) {
  // Fetching things from database or whatever

  process.nextTick(function() {
    var opts = {
      server: {
        url: 'ldap://ldap.ku.edu.tr:389',
        bindDn: 'cn=' + req.body.username + ',ou=usr,o=ku',
        bindCredentials: req.body.password,
        searchBase: 'o=ku',
        searchFilter: '(uid=' + req.body.username + ')'
      }
    };

    callback(null, opts);
  });

};

passport.use(new GoogleStrategy({
    clientID: sails.config.google.clientID,
    clientSecret: sails.config.google.clientSecret,
    callbackURL: sails.config.google.callbackURL,
    scope: ['profile', 'email'],
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log("google Come");
    console.log(profile);

    process.nextTick(function() {

      findByUsername(profile.id, function(err, userdb) {

        if (err)
          return done(null, err);
        if (!userdb) {
          var usr = {
            username: profile.id,
            name: profile.displayName,
            password: 'N/A',
            email: profile.emails[0].value,
            role: 4,
            avatar: profile.photos[0].value}
          };
          User.create(usr).exec(function(err, created) {
            if (created) {
              return done(null, created);
            }
          });
        } else {
          var returnUser = {
            username: userdb.username,
            createdAt: userdb.createdAt,
            id: userdb.id,
            avatar: userdb.avatar
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        }
      });

    });

    /* User.findOrCreate({
       username: profile.id
     }, function(err, user) {
       console.log(err);
       console.log(user);
       return done(err, user);
     });*/
  }
));
module.exports.http = {

  customMiddleware: function(app) {
    console.log("Init");
    app.use(passport.initialize());
    app.use(passport.session());
  }

};

// Google client ID  : 412383755015-qs4k8eevr0e0nobo7monck1q5drjeupm.apps.googleusercontent.com
// Client Secret : Y85wV4DCm42QndTuW0gKQaTz
//
//
