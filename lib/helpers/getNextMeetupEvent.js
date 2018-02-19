const fetch = require('node-fetch');
const fetchEventsParams = require('../../config/meetup_event.json');

module.exports = async() => {
	const fetch_url = `https://api.meetup.com/${fetchEventsParams.group_name}/events?only=${fetchEventsParams.fields}&page=20&scroll=next_upcoming`;
	
	const res = await fetch(fetch_url);
	const result = await res.json();
	
	for(let i in result){
		if( new Date(result[i].time).getDay() == 3 ) {
			console.log(result[i]);
			return result[i];
		}
	}
}