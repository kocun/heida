/**
 * AuthControllerController
 *
 * @description :: Server-side logic for managing Authcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var ldap = require('passport-ldapauth');
var passport = require('passport');
module.exports = {

  // Returns logged user data
  me: function(req, res) {

    if (req.user) {
      User.findOne({
        username: req.user.username
      }).exec(function(err, user) {
        res.json(user);
      });
    }
    else {
      res.json({});
    }
  },
  login: function(req, res) {
    res.view();
  },
  process: function(req, res) {
    console.log(req.param('provider'));
    var provider = req.param('provider') || 'local';
    console.log("1-" + provider);
    passport.authenticate(provider, function(err, user, info) {

      console.log("err:" + err);
      console.log(user);
      console.log(info);
      if ((err) || (!user)) {
        req.flash('message');
        return res.redirect('/#/login');
      }
      req.logIn(user, function(err) {
        if (err) {
          res.send(err);
        }
        return res.redirect("/#/dashboard/home");
      });
    })(req, res);
  },
  logout: function(req, res) {
    req.logout();
    res.send('logout successful');
  },
  callback: function(req, res) {
    passport.authenticate('google', function(err, user, info) {
      console.log("err:" + err);
      console.log(user);
      console.log(info);
      if ((err) || (!user)) {
        req.flash('message');
        return res.redirect('/#/login');
      }
      req.logIn(user, function(err) {
        if (err) {
          res.send(err);
        }
        return res.redirect("/#/dashboard/home");
      });
    })(req, res);
  }

};

module.exports.blueprints = {

  // Expose a route for every method,
  // e.g.
  // `/auth/foo` =&gt; `foo: function (req, res) {}`
  actions: true,

  // Expose a RESTful API, e.g.
  // `post /auth` =&gt; `create: function (req, res) {}`
  rest: true,

  // Expose simple CRUD shortcuts, e.g.
  // `/auth/create` =&gt; `create: function (req, res) {}`
  // (useful for prototyping)
  shortcuts: true

};
