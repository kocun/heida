/**
 * DataDetail.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    indicator : {
      model:'Indicator'
    },
    criteria : {
      model:'Criteria'
    },
<<<<<<< HEAD
    question:{
      model:'Question'
=======
    questions:{
      collection:'Question'
>>>>>>> ec4c1e9b9da4cec2d7fe457b117b325f577ab17e
    }
  }
};
