const general_config = require('../../config/general.json');

const getEvents = require('./getMeetupEvents.js');

module.exports = async () => {	
	const result = await getEvents(2);  
	
	const event_time = result[0].time;
	const next_event_time = result[1].time;
	
	const now = new Date();
	const in_hour = 60*60*1000;
	
	let time_ranges = general_config.time_ranges;
	
	time_ranges.sort(function(a, b) {
		return b - a;
	});
	for(let i in time_ranges){
		let trigger_time = event_time - time_ranges[i]*in_hour;
		if( trigger_time > now.getTime() ) return trigger_time;
	}
	
	return next_event_time - time_ranges[0]*in_hour;
}