const
	mongoose = require('mongoose'),
	Coffee = require('../models/Coffee.js');

const subscribersController = {};

subscribersController.list = async (ctx, next) => {
	const response = {};
	try{
		let coffee = await Coffee.find();
		
		response.message = coffee;
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

module.exports = subscribersController;