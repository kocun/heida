/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  chart: function (req, res) {
    Data.find({
      indicator: req.param('indicator'),
    }).sort('year ASC').populate('department').populate('indicator').exec(function (err, datas) {
      console.log(datas);
      return res.json(datas);
    });
  },
  create: function (req, res) {
    console.log(req.body);
    Data.create({
      department: req.body.department,
      indicator: req.body.indicator,
      year: req.body.year.val,
      value: req.body.value
    }).exec(function (err, created) {
      return res.json(created);
    });
  }

};



