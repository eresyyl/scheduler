const Koa = require('koa'),
	app = new Koa(),
	mongoose = require('mongoose'),
	agenda = require('./lib/agenda.js'),
	{routes, allowedMethods} = require('./lib/routes'),
	mongoConnectionString = require('./config/mongo.json').connection_string,
	port = require('./config/general.json').server_port || 3000;	
	
//require('./lib/jobs/meetupNotifications.js')(agenda);
require('./lib/jobs/coffeeOrderNotifications.js')(agenda);

mongoose.Promise = global.Promise;
	
mongoose.connect(mongoConnectionString, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Mongoose is on!');
});
	
app.use(routes());
app.use(allowedMethods());

app.listen(port, async() => {
	console.log(`Listening on port: ${port}`);
});

agenda.on('ready', async() =>  {
	console.log('agenda is ready!');
	
	agenda.start();
});