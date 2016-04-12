/**
 * Groups.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
autoPK: true,
  attributes: {

    //
    // No access groups
    // No Year
    // Rename to Groups
    //
    name: {
      type: 'string',
      required: true,

    },
    subs: {
      collection: 'SubGroup',
      via: 'group'

    }
  }
};
