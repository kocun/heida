/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  chart: function(req, res) {
    console.log(req.param('department'));

    Data.find({
      indicator: req.param('indicator'),
    }).sort('year ASC').populate('department').populate('indicator').exec(function(err, datas) {
      console.log(datas);
      return res.json(datas);
    });
  }
};



