
var categoryService = require('../services/categoryServices');
var _ = require("underscore");

var categoryController = {
	index: function (req, res) {
		return categoryService.index().then(function (data, err) {
			if (!err) {
				res.send({category: data});
			} else {
				res.send({
					error: err,
					message: 'Unable to fetch category Data'
				});
			}
		});


	}

};

module.exports = categoryController;

