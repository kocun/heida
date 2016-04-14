/**
 * Creteria.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  attributes: {
    // Every indicator can / must have multiple criterias.
    // Admin can create criterias
    name : {
      type:'string',
    },
    questions:{
      collection:'Question',
      via:'criteria'
    },
    multiple:{
      type:'boolean'
    }
  }
};
