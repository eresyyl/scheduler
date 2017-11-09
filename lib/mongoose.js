let mongoose = require('mongoose');
	//const mongoConnectionString = require('./config/mongo.json').connection_string;

mongoose.Promise = global.Promise;

module.exports = mongoose;