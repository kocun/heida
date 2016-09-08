/**
 * DataDetailController
 *
 * @description :: Server-side logic for managing Datadetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findAll: function (req, res) {
		console.log("Layn1");
		DataDetail.find().populate('criteria').populate('indicator').populate('question').exec(function (err, datadetails) {
			res.json(datadetails);
		});
	},
	find: function (req, res) {
		console.log("Layn2");
		DataDetail.find().populate('criteria').populate('indicator').populate('question').exec(function (err, datadetails) {
			res.json(datadetails);
		});
	}

};
