/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/
  port: 8081,
  admin: {
    user: 'admin',
    pass: 'admin',
    role: 'admin'
  },
  ldap: {
    url: 'ldap://login.ku.edu.tr:389',
    ldapo: 'ku',
    ldapou: 'usr',
    ldapcn: 'cn',
  },

  migrate: 'safe',
  models: {
    connection: 'mongo'
  },
  // This a test account you should replace it .
  google: {
    clientID: '412383755015-qs4k8eevr0e0nobo7monck1q5drjeupm.apps.googleusercontent.com',
    clientSecret: 'Y85wV4DCm42QndTuW0gKQaTz',
    callbackURL: 'http://heida.test.ku.edu.tr/api/auth/google/callback',
    scope: ['profile', 'email']
  }

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

};
