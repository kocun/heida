/**
 * Department.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  attributes: {
    //
    // Every deprtment chooses Indicators, and answers them
    //
    name: {
      type: 'string',
    },
    user: {
      collection: 'user',
      via: 'department'

    },
    subs: {
      collection: 'SubDepartment',
      via: 'department'

    }
  }
};
