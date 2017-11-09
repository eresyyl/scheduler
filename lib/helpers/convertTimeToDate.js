const general_config = require('../../config/general.json');

module.exports = function(time){
	const in_hour = 60*60*1000;
	
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long',
		timezone: 'UTC',
		hour: 'numeric',
		minute: 'numeric'
	};
	
	return new Date(
		time + general_config.timezone*in_hour
	).toLocaleString("en-US", options);
}