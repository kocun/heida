/**
 * QuestionController
 *
 * @description :: Server-side logic for managing Questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    search: function(req, res) {
			
        Indicator.find({
            name: {
                'contains': req.params.text
            }
        }).exec(function(err, indicators) {
            return res.json(indicators);
        });
    },
};
