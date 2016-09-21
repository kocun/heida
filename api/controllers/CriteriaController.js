/**
 * CreteriaController
 *
 * @description :: Server-side logic for managing creterias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  find: function (req, res) {
    Criteria.find({sort :'name ASC'}).populate('questions').exec(function (err, criterias) {
      res.json(criterias);
    });
  }
};

