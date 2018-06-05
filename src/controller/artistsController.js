
var artistsService = require('../services/artistServices');
var _ = require("underscore");

var artistsController = {
		index: function (req, res) {
			if ( req.query && req.query.name != null && req.query.name !=''){
				return artistsController.getSongsListByName(req, res);
			}
			else if (req.query && req.query.category !=null && req.query.category !='') {
				return artistsController.getArtistsListByCategory(req, res);
			}
			else {
				return artistsService.index().then(function (data, err) {
					if (!err) {
						res.send({artist:data});
					} else {
						res.send({
							error: err,
							message: 'Unable to fetch Artists Data'
						});
					}
				});
			}

		},
		createArtist: function (req, res) {
			var name = req.body.name;
			if (name != null && name != 'null' && name != '') {
				return artistsService.createArtist(name, req.body.songs, req.body.image, req.body.category).then(function (data, err) {
					if (!err) {
						return res.send({
							message: 'Artist crated successfully',
							data: 'OK'
						});
					} else {
						return res.send({
							error: err,
							message: 'unable to create artist'
						});
					}
				});

			}
		},
		getArtistsListByCategory: function (req, res) {
			var category = req.query ?  req.query.category : req.params.category;
			console.log(category);
			if (category != null && category != 'null' && category != '') {
				return artistsService.getArtistsListByCategory(category).then(function (data, err) {
					if (!err) {
						return res.send({'songs': data});
					} else {
						return res.send({
							error: err,
							message: 'Unable to fetch artists songs list'
						});
					}
				});
			} else {
				return res.send({error: "category Required"})
			}
		},
		getSongsListByName: function (req, res) {
			var name = req.query ? req.query.name : req.params.name;
			if (name != null && name != 'null' && name != '') {
				return artistsService.getSongsListByName(name).then(function (data, err) {
					if (!err) {
						return res.send({'song': data[0]});
					} else {
						return res.send({
							error: err,
							message: 'Unable to fetch songs Data'
						});
					}
				});
			}
			else{
				return res.send({error: "Name Required"})
			}
		}

};

module.exports = artistsController;
