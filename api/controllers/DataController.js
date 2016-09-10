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
<<<<<<< HEAD
    }).sort('year ASC').populate('department').populate('indicator').populate('answers').exec(function (err, datas) {
=======
    }).sort('year ASC').populate('department').populate('indicator').populate('criterias').exec(function (err, datas) {
>>>>>>> ec4c1e9b9da4cec2d7fe457b117b325f577ab17e
      return res.json(datas);
    });
  },
  create: function (req, res) {
<<<<<<< HEAD

    Data.create({
      department: req.body.department,
      indicator: req.body.indicator,
      year: req.body.year,
      value: req.body.value,
      answers:req.body.answers
=======
    Data.create({
      department: req.body.department,
      indicator: req.body.indicator,
      years: req.body.years,
      criterias:req.body.criterias,
      periodType: req.body.periodType,
      public: req.body.public,
>>>>>>> ec4c1e9b9da4cec2d7fe457b117b325f577ab17e
    }).exec(function (err, created) {
      return res.json(created);
    });
  },

  find:function(req,res){

<<<<<<< HEAD
    Data.find().populate("department").populate("indicator").populate("answers").exec(function(err,data){
=======
    Data.find().populate("department").populate("indicator").populate("criterias").populate("years").exec(function(err,data){
>>>>>>> ec4c1e9b9da4cec2d7fe457b117b325f577ab17e
      res.json(data);
    });
  },

  findOne:function(req,res)
  {
<<<<<<< HEAD
    
    Data.findOne(req.param('id')).populate("department").populate("indicator").populate("answers").exec(function(err,data){
      res.json(data);
    });
  }

=======

    Data.findOne(req.param('id')).populate("department").populate("indicator").populate("criterias").populate("years").exec(function(err,data){
      res.json(data);
    });
  }

>>>>>>> ec4c1e9b9da4cec2d7fe457b117b325f577ab17e
};
