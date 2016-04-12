/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');
module.exports = {

  //
  // User must have Department
  //
  //
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    name: {
      type: 'string'
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email'
    },
    role: {
      enum: [4, 3, 2, 1]
      //4 - admin , 3 - editor 2- read-only 3- public
    },
    department: {
      collection: 'department',
      via:'user'

    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }
};
