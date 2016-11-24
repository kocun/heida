/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }
  host: 'localhost',
  port: 1337,
  google: {
    clientID: '412383755015-qs4k8eevr0e0nobo7monck1q5drjeupm.apps.googleusercontent.com',
    clientSecret: 'Y85wV4DCm42QndTuW0gKQaTz',
    callbackURL: 'http://localhost:1337/api/auth/google/callback',
    scope: ['profile', 'email']
  },
  models: {
    connection: 'mongo'
  }
};
