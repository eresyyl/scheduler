const
	mongoose = require('mongoose'),
	agenda = require('../agenda.js'),
	Subscribers = require('../models/Subscribers.js'),
	getTriggeredTime = require('../helpers/getTriggeredTime.js'),
	agendaJob = 'Send MeetUp Notification';

const subscribersController = {};

subscribersController.list = async (ctx, next) => {
	const response = {};
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

subscribersController.create = async (ctx, next) => {
	const response = {};
	//try{
		const {body} = ctx.request;
		let subscriber = new Subscribers(body);
		
		console.log(subscriber);
		await subscriber.save();	
		
		const triggerTime = await getTriggeredTime();
		let job = agenda.create(agendaJob, body);
		
		job.schedule(new Date(triggerTime)).save();
		console.log(`next message in ${new Date(triggerTime)}, response_path = ${subscriber.response_path}`);
		console.log(new Date());		
			
		response.message = subscriber;
		response.code = 201;	
	/*}
	catch(err){
		response.error = err.errmsg;
		response.code = 400;	
	}*/
	ctx.body = response;
	ctx.status = response.code;
	
    await next();
}

subscribersController.check = async (ctx, next) => {
	const response = {};
	try{
		let subscriber = await Subscribers.findOne({ response_path: ctx.params.response_path });
		
		
		response.message = subscriber ? true : false;
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

subscribersController.remove = async (ctx, next) => {
	const response = {};
	try{
		let subscriber = await Subscribers.findOne({ response_path: ctx.params.response_path });
		const data = {
			response_path: subscriber.response_path,
			first_name: subscriber.first_name,
			last_name: subscriber.last_name
		};
		
		await agenda.cancel({name: agendaJob, data});
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