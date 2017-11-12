const
	mongoose = require('mongoose'),
	agenda = require('../agenda.js'),
	Subscribers = require('../models/Subscribers.js'),
	getTriggeredTime = require('../helpers/getTriggeredTime.js'),
	agendaJob = 'Send MeetUp Notification';
	
mongoose.Promise = global.Promise;
require('../jobs/meetup_notifications.js')(agenda);

let subscribersController = {};

subscribersController.list = async function(ctx, next) {
	let response = {};
	try{
		let subscribers = await Subscribers.find({}, 'response_path first_name last_name');
		
		response.message = subscribers;
		response.code = 201;
	}
	catch(err){
		response.error = err.errmsg;
		response.code = 400;	
	}
	
    ctx.body = response;
	ctx.code = response.code;
	
    await next();
}

subscribersController.create = async function(ctx, next) {
	let response = {};
	try{
		const {body} = ctx.request;
		let subscriber = new Subscribers(body);
		
		console.log(subscriber);
		await subscriber.save();	
		
		const trigger_time = await getTriggeredTime();		
		let job = agenda.create(agendaJob, body);
		
		job.schedule(new Date(trigger_time)).save();
		console.log(`next message in ${new Date(trigger_time)}, response_path = ${subscriber.response_path}`);
		console.log(new Date());		
			
		response.message = 'OK';
		response.code = 201;	
	}
	catch(err){
		response.error = err.errmsg;
		response.code = 400;	
	}
	ctx.body = response;
	ctx.status = response.code;
	
    await next();
}

subscribersController.remove = async function(ctx, next) {
	let response = {};
	try{
		let subscriber = await Subscribers.findOne({ response_path: ctx.params.response_path });
		let job_data = {
			response_path: subscriber.response_path,
			first_name: subscriber.first_name,
			last_name: subscriber.last_name
		};
		
		await agenda.cancel({name: agendaJob, data: job_data});
		await subscriber.remove();
		
		console.log(`Job deleted, response_path = ${subscriber.response_path}`);
		
		response.message = 'OK';
		response.code = 201;	
	}
	catch(err){
		response.error = err;
		response.code = 400;	
	}
	ctx.body = response;
    ctx.status = response.code;
	
    await next();
}

module.exports = subscribersController;