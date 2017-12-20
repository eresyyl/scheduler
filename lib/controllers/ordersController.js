const
	mongoose = require('mongoose'),
	agenda = require('../agenda.js'),
	Orders = require('../models/Orders.js');

const ordersController = {};

ordersController.create = async (ctx, next) => {
	const response = {};
	try{
		const {body} = ctx.request;
		body.creation_date = new Date().getTime();
		body.verified = false;
		
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


ordersController.verify = async (ctx, next) => {
	const response = {};
	try{
		const {id} = ctx.request.body;
		let order = await Orders.findOne({ _id: id });
		order.verification_date = new Date().getTime();
		order.verified = true;
		
		await order.save();
		
		response.message = order;
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