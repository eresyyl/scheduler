const generalConfig = require('../../config/general.json');

module.exports = function(time){
	const inHour = 60*60*1000;
	
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
		time + generalConfig.timezone*inHour
	).toLocaleString("en-US", options);
}