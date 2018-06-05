var mongoose = require('mongoose');
var CategorySchema = mongoose.Schema({
	name:{type: String}
});

var Category = mongoose.model('Category', CategorySchema);

// make this available to our users in our Node applications
module.exports = Category;
