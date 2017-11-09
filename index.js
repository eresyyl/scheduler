const Koa = require('koa'),
	app = new Koa(),
	{routes, allowedMethods} = require('./lib/routes'),
	agenda = require('./lib/agenda.js'),
	mongoConnectionString = require('./config/mongo.json').connection_string;

const mongoose = require('./lib/mongoose.js');	

let db = mongoose.createConnection(mongoConnectionString);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is on!');
});
	
app.use(routes());
app.use(allowedMethods());

app.listen(3000);

agenda.on('ready', async() =>  {
	agenda.start();
});