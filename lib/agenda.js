const Agenda = require('agenda'),
	mongoConnectionString = require('../config/mongo.json').connection_string,
	agenda = new Agenda({db: {address: mongoConnectionString}});

module.exports = agenda;