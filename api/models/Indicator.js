/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');
module.exports = {

  //
  // Rename Indicator
  // Year
  // And permison read only and public only
  //
  // Standard input Criteria
  // Create Criteria
  //
  autoPK: true,
  attributes: {
    code: {
      type: 'string',
      unique: true
    },
    name: {
      type: 'string',
      required: true
    },
    valueType:{
      enum:['yes/no','numeric','percentage']
    },
    public:{
      enum:['Public','Staff Only','Not Sure']
    },
    subgroup: {
      model: 'SubGroup'
    },
    goal1:{
      type:'integer',
      enum:[0,1,2,3]
    },
    goal2:{
      type:'integer',
      enum:[0,1,2,3]
    },
    goal3:{
      type:'integer',
      enum:[0,1,2,3]
    },
    goal4:{
      type:'integer',
      enum:[0,1,2,3]
    },
    goal5:{
      type:'integer',
      enum:[0,1,2,3]
    }

  }
  /*  afterCreate: function(created, cb) {
      console.log(created.id);

      if (/\s/.test(created.subgroup.name)) {
        var s = created.name.split(" ");

        var t = "";
        for (var i = 0; i < s.length; i++) {
          t = t + s[i].substring(0, 1).toUpperCase();
        }

        Indicator.findOne({
          id: created.id
        }).exec(function(err, found) {
          found.code = t + "-" + created.id;
          found.save(function(err, saved) {
            console.log(saved);
          });
        });
        console.log(created.code);

      } else {

        Indicator.findOne({
          id: created.id
        }).exec(function(err, found) {
          console.log(found);

          found.code = found.subgroup.name.substring(0,2).toUpperCase() + "-" + created.id;
          found.save(function(err, saved) {
            console.log(saved);
          });
        });
      }

      cb();
    }*/
};
