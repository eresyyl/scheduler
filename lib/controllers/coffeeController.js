const
	mongoose = require('mongoose'),
	Coffee = require('../models/Coffee.js');

const subscribersController = {};

subscribersController.list = async (ctx, next) => {
	const response = {};
	try{
		const coffee = await Coffee.find();
		
		const coffeeResponse = {};
		
		for(let i in coffee) coffeeResponse[coffee[i].name] = coffee[i];
		
		response.message = coffeeResponse;
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