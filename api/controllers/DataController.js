/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var  _  = require('underscore');
module.exports = {

  chart: function(req, res) {
    Data.find({
      indicator: req.param('indicator')
    }).sort('year ASC').populate('department').populate('indicator').populate('criterias').exec(function(err, datas) {
      return res.json(datas);
    });
  },
  create: function(req, res) {
    Data.create({
      department: req.body.department,
      indicator: req.body.indicator,
      years: req.body.years,
      subDepartment: req.body.subDepartment,
      departmentDesc: req.body.departmentDesc,
      criterias: req.body.criterias,
      periodType: req.body.periodType,
      public: req.body.public
    }).exec(function(err, created) {
      return res.json(created);
    });
  },
  find: function(req, res) {
    Data.find().populate("department").populate("subDepartment").populate("indicator").populate("criterias").populate("years").exec(function(err, data) {
      res.json(data);
    });
  },
  findByNameOfUnit:function(req, res) {
    Data.find({departmentDesc:req.param('nameOfUnit')}).populate("department").populate("subDepartment").populate("indicator").populate("criterias").populate("years").exec(function(err, data) {
      res.json(data);
    });
  },
  findByIndicatorCode:function(req, res) {
    var indcode=req.param('indicatorCode');
    Data.find().populate("department").populate("subDepartment").populate("indicator").populate("criterias").populate("years").exec(function(err, data) {
      //console.log(data);
      var rrr = _.filter(data,function(ind){
        console.log(ind);
        if(ind.indicator.code==indcode){
          return ind;
        }
      });
      res.json(rrr);

    });
  },
  findOne: function(req, res) {
    Data.findOne(req.param('id')).populate("department").populate("subDepartment").populate("indicator").populate("criterias").populate("years").exec(function(err, data) {
      Indicator.findOne(data.indicator).populate('subgroup').exec(function(err, ind) {
        console.log(ind);
        Group.findOne(ind.subgroup.group).exec(function(err, grp) {
          console.log(grp);
          ind.group = grp;
          data.indicator = ind;
          SubDepartment.findOne(data.subDepartment.id).exec(function(err, sd) {
            data.subDepartment = sd;
            res.json(data);
          });
        });
      });
    });
  }

};
