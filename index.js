const Koa = require('koa'),
	app = new Koa(),
	mongoose = require('mongoose'),
	agenda = require('./lib/agenda.js'),
	{routes, allowedMethods} = require('./lib/routes'),
	mongoConnectionString = require('./config/mongo.json').connection_string;	
	
require('./lib/jobs/meetupNotifications.js')(agenda);

mongoose.Promise = global.Promise;
	
mongoose.connect(mongoConnectionString, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Mongoose is on!');
});
	
app.use(routes());
app.use(allowedMethods());

app.listen(3000);

agenda.on('ready', async() =>  {
	console.log('agenda is ready!');
	
	agenda.start();
});