/**
 * Indicator.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  //
  // Rename this to Sub-Group
  // No year
  // No permission
  //
  autoPK: true,

  attributes: {
    name: {
      type: 'string',
      required: true,


    },
    group: {
      model: 'Group'
    },
    indicators: {
      collection: 'Indicator',
      via: 'subgroup'
    }

  }
};
