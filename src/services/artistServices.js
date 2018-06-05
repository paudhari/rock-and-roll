var Q = require('q'),
    Artist = require('../db/artistModel');


var artistServices = {
    index: function () {
        var deferred = Q.defer();
        Artist.find({},{ __v:0, updated_at:0, created_at:0},  function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    },
	createArtist: function (name, songs, image, category) {
        console.log("testing ")
        console.log(image);
        var deferred = Q.defer(),
            newArtist = new Artist({
                name: name,
                image: image,
                songs: songs,
	            category: category,
                created_at: new Date(),
                updated_at: new Date()
            });
        newArtist.save(function (err) {
            console.log("data ", err)
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve({});
            }

        });

        return deferred.promise;
    },
    getArtistsListByCategory: function (name) {
    	var deferred = Q.defer();
    	var query = {};
    	query = (name === 'All') ? query : {'category': name};
        Artist.find(query, {__v:0, updated_at:0, created_at:0, songs:0}, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;

    },
    getSongsListByName: function (name) {
        var deferred = Q.defer();
        Artist.find({name: name}, {__v:0, updated_at:0, created_at:0, category:0}, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }


};

module.exports = artistServices;
