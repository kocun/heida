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
    }).sort('year ASC').populate('department').populate('indicator').populate('answers').exec(function (err, datas) {
      return res.json(datas);
    });
  },
  create: function (req, res) {

    Data.create({
      department: req.body.department,
      indicator: req.body.indicator,
      year: req.body.year,
      value: req.body.value,
      answers:req.body.answers
    }).exec(function (err, created) {
      return res.json(created);
    });
  },

  find:function(req,res){

    Data.find().populate("department").populate("indicator").populate("answers").exec(function(err,data){
      res.json(data);
    });
  },

  findOne:function(req,res)
  {
    
    Data.findOne(req.param('id')).populate("department").populate("indicator").populate("answers").exec(function(err,data){
      res.json(data);
    });
  }

};
