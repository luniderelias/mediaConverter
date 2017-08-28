var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
	created_by: String, //hash created from password
	created_at: {type: Date, default: Date.now},
	text: String
});


var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
});


//declare a model called user which has schema userSchema
mongoose.model("Post",postSchema);
mongoose.model("User",userSchema);