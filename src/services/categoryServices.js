var Q = require('q'),
	Category = require('../db/categoryModel');


var categoryServices = {
	index: function () {
		var deferred = Q.defer();
		Category.find({}, {__v: 0}, function (err, result) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(result);
			}
		});
		return deferred.promise;
	}


};
module.exports = categoryServices;

