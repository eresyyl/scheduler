const generalConfig = require('../../config/general.json');

const getEvent = require('./getNextMeetupEvent.js');

module.exports = async () => {	
	const event = await getEvent();  	
	const eventTime = event.time;
	
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
	
}