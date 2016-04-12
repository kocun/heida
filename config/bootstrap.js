/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  //
  User.findOrCreate(
    // Search for user with "admin" flag
    {
      username: sails.config.admin.username || 'admin'
    },
    // Create one if no such user is found
    {
      username: sails.config.admin.username || 'admin',
      password: sails.config.admin.password || 'admin',
      role: sails.config.admin.role || 4
    }
  ).exec(function createFindCB(error, createdOrFoundRecords) {
      cb();
  });
 // cb();
};
