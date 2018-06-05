var Q = require('q');
var sinon = require('sinon');
var Category = require('./categoryModel')
var mongoose = require ("mongoose"); // The reason for this demo.

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/rockandroll';
mongoose.connect(uristring, function (err, conn) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
        var category = [
	            {name: "All"},
                {name: "Pop"},
                {name: "Rock"}
	        ];
	    var res={};
	    res.send=sinon.spy();
	    res.end=sinon.spy();
	    res.status=sinon.spy();
	    return insertCategory(Category, category).then(function(result) {
		    res.status(200);
		    res.send('inserted successfully');
	    }).fail(function(err) {
		    console.log("errro in creating the category ", err);
	    	res.status(500);
		    res.send({
			    "error": err
		    });
	    });
    }
});

function insertCategory(Category, category) {
	var deferred = Q.defer();
	Category.remove({}, function(err) {
		if(err)
			console.log('error in remove category collection', err);
		else{
			return Q.all(category.map(function(obj) {
				var insertCategory = new Category(obj);
				insertCategory.save(function (err) {
					if (err) {
						deferred.reject(err);
					} else {
						deferred.resolve({});
					}
				});
			}));
		}
	});
	return deferred.promise;
}