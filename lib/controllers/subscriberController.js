const getTriggeredTime = require('../helpers/getTriggeredTime.js'),
	agenda = require('../agenda.js'),
	agendaJob = 'Send MeetUp Notification',
	mongoConnectionString = require('../../config/mongo.json').connection_string;
	
let mongoose = require('../mongoose.js');
let Subscriber = require('../models/Subscriber.js');
	
require('../jobs/meetup_notifications.js')(agenda);


let subscriberController = {};

subscriberController.list = async function(ctx, next) {
    ctx.body = 'list';
    await next();
}

subscriberController.create = async function(ctx, next) {
	let response = {};
	//if(ctx.request.body.response_path){
		try{
			let subscriber = new Subscriber(ctx.request.body);
			
			await subscriber.save();
			
			console.log(subscriber);
				
			response.message = `created ${subscriber.response_path}`;
			response.status = 201;		
			
			const trigger_time = await getTriggeredTime();		
			let job = agenda.create(agendaJob, {subscriber: subscriber});
			
			job.schedule(new Date(trigger_time)).save();
			console.log(`next message in ${new Date(trigger_time)}, response_path = ${subscriber.response_path}`);
			console.log(new Date());
		}
		catch(err){
			response.message = err;
			response.status = 400;	
		}
	/*}
	else{
		response.message = `response_path is needed`;
		response.status = 400;
	}*/
	ctx.body = JSON.stringify(response);
	ctx.status = response.status;
	
    await next();
}

subscriberController.remove = async function(ctx, next) {
	//await myDb.removeId(ctx.params.response_path);
	console.log(ctx.params);
	
	Subscriber.deleteMany({ response_path: ctx.params.response_path });
	agenda.cancel({name: agendaJob, data: {response_path: ctx.params.response_path}});
	ctx.body = 'deleted';
    ctx.status = 204;
    await next();
}

module.exports = subscriberController;