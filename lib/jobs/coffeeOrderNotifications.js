const fetch = require('node-fetch'),
	generalConfig = require('../../config/general.json'),
	Orders = require('../models/Orders.js');
 
module.exports = function(agenda) {
	agenda.define('Send coffee Order Notification', async (job, done) => {	
		const confirmedOrders = encodeURIComponent(
			JSON.stringify(
				await Orders.find({confirmed: true, creation_date: {$lte: job.attrs.runAt}})
			)
		);
		
		await fetch(`${generalConfig.send_coffee_notifications_url}?orders=${confirmedOrders}`);
		
		await Orders.remove();
		await job.remove();
		
		console.log('coffee notification sent at:', new Date());
		
		done();
	});
};