const fetch = require('node-fetch');
const timezone = require('../../config/general.json').timezone;
const fetchEventsParams = require('../../config/meetup_event.json');

module.exports = async(eventsCount = 1) => {
	const fetchUrl = `https://api.meetup.com/${fetchEventsParams.group_name}/events?only=${fetchEventsParams.fields}&page=20&scroll=next_upcoming`;
	
	const res = await fetch(fetchUrl);
	const result = await res.json();
	
	const inHour = 60*60*1000;
	
	let events = [];
	for(let i in result){
		if( new Date(result[i].time + timezone*inHour).getDay() == 3 ) {
			events.push(result[i]);
			if(events.length == eventsCount) return events;
		}
	}
	
	return events;
}