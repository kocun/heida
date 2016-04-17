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
  port: 80,
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
  mongo: {
    adapter: 'sails-mongo',
    host: '10.11.254.100',
    port: 27017,
    // user: 'username',
    // password: 'password',
    database: 'heida'
  },

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

};
