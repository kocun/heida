/**
 * Allow any authenticated user.
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to controller
  var is_auth = req.isAuthenticated();
  console.log(req.path + ':' + req.method + '-' + is_auth);
  return next();
  // Try to find end point
  // Todo : Read Them from cache
  Authorization.findOne(req.path + ':' + req.method).exec(function(err, auth) {
    //if End point found check authorization
    if (auth) {
      console.log(auth.role);
      console.log(req.user.role);
      if (req.user.role >= auth.role) {
        return next();
      } else {
        return res.forbidden();
      }
    } else { // if end point is not found user must be authenticated
      if (is_auth) {
        return next();
      } else { // If user is not authenticated redirect to login page
        return res.forbidden();
      }
    }

  });

};
