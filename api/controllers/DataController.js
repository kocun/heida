/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
            criterias: req.body.criterias,
            periodType: req.body.periodType,
            public: req.body.public
        }).exec(function(err, created) {
            return res.json(created);
        });
    },
    find: function(req, res) {
        Data.find().populate("department").populate("subdepartment").populate("indicator").populate("criterias").populate("years").exec(function(err, data) {
            res.json(data);
        });
    },
    findOne: function(req, res) {
        Data.findOne(req.param('id')).populate("department").populate("indicator").populate("criterias").populate("years").exec(function(err, data) {
            Indicator.findOne(data.indicator).populate('subgroup').exec(function(err, indicator) {
                data.indicator = indicator;
                res.json(data);
            });
        });
    }

};
