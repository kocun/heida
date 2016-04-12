var express      = require('express'),
    passport     = require('passport'),
    bodyParser   = require('body-parser'),
    LdapStrategy = require('passport-ldapauth');

var OPTS = {
  server: {
    url: 'ldap://ldap.ku.edu.tr:389',
    bindDn: 'cn=AATILGAN,ou=usr,o=ku',
    bindCredentials: 'Kalpazan99',
    searchBase: 'o=ku',
    searchFilter: '(uid=aatilgan)'
  }
};


console.log("Ldap");
passport.use(new LdapStrategy(OPTS,
  function(user, password, done) {
    console.log("Ldap");

    return done(null, user);
  }
));

console.log("Ldap");
