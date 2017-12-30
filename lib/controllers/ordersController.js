const
	mongoose = require('mongoose'),
	agenda = require('../agenda.js'),
	Orders = require('../models/Orders.js'),
	getCoffeeNotificationTime = require('../helpers/getCoffeeNotificationTime.js'),
	agendaJob = 'Send coffee Order Notification';

const ordersController = {};

ordersController.create = async (ctx, next) => {
	const response = {};
	try{
		const {body} = ctx.request;
		body.creation_date = new Date().getTime();
		body.confirmed = false;
		
		let order = new Orders(body);
		
		await order.save();	
			
		response.message = order;
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


ordersController.confirm = async (ctx, next) => {
	const response = {};
	//try{
		const {id} = ctx.request.body;
		let order = await Orders.findOne({ _id: id });
		order.confirmation_date = new Date().getTime();
		order.confirmed = true;
		
		await order.save();
		const notificationTime = await getCoffeeNotificationTime();
		const params = { runAt: notificationTime };
		
		let job = agenda.create(agendaJob, params);
		
		
		job.unique(params);
		job.schedule(new Date(notificationTime));
		job.save();
		
		response.message = order;
		response.code = 201;	
	/*}
	catch(err){
		response.error = err;
		response.code = 400;	
	}*/
	ctx.body = response;
    ctx.status = response.code;
	
    await next();
}

ordersController.remove = async (ctx, next) => {
	const response = {};
	try{
		const {id} = ctx.params;
		console.log(id);
		let order = await Orders.findOne({ _id: id });
		
		await order.remove();
		
		response.message = 'Ok';
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

module.exports = ordersController;