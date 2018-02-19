const fetch = require('node-fetch');
const timezone = require('../../config/general.json').timezone;
const fetchEventsParams = require('../../config/meetup_event.json');

module.exports = async() => {
	const fetch_url = `https://api.meetup.com/${fetchEventsParams.group_name}/events?only=${fetchEventsParams.fields}&page=20&scroll=next_upcoming`;
	
	const res = await fetch(fetch_url);
	const result = await res.json();
	
	const inHour = 60*60*1000;
	
	for(let i in result){
		if( new Date(result[i].time + timezone*inHour).getDay() == 3 ) {
			return result[i];
		}
	}
}