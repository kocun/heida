/**
 * Authorization.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    key: {
      type: 'string',
      unique: true,
      primaryKey: true,
    },
    url: {
      type: 'string'
    },
    method: {
      type: 'string'
    },
    role: {
      enum: ['4', '3', '2', '1']
    }
  },

};
