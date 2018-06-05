
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var songsSchema = mongoose.Schema({
	name:String,
    image:String
},{ _id : false });



var ArtistsSchema = new Schema({
    name: {type: String, required: true, unique: true},
    category:{type: String},
    image: {type: String},
    songs: [songsSchema],
    created_at: Date,
    updated_at: Date
});
// custom method to add string to end of name
// you can create more important methods like name validations or formatting


// the schema is useless so far
// we need to create a model using it

var Artist = mongoose.model('Artist', ArtistsSchema);

// make this available to our users in our Node applications
module.exports = Artist;
