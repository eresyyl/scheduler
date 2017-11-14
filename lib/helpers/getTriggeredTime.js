const generalConfig = require('../../config/general.json');

const getEvents = require('./getMeetupEvents.js');

module.exports = async () => {	
	const result = await getEvents(2);  
	
	const eventTime = result[0].time;
	const nextEventTime = result[1].time;
	
	const now = new Date();
	const inHour = 60*60*1000;
	
	let timeRanges = generalConfig.time_ranges;
	
	timeRanges.sort(function(a, b) {
		return b - a;
	});
	for(let i in timeRanges){
		let trigger_time = eventTime - timeRanges[i]*inHour;
		if( trigger_time > now.getTime() ) return trigger_time;
	}
	
	return nextEventTime - timeRanges[0]*inHour;
}