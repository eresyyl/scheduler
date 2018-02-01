const fetch = require('node-fetch');
const fetchEventsParams = require('../../config/meetup_event.json');

module.exports = async() => {
	const fetch_url = `https://api.meetup.com/${fetchEventsParams.group_name}/events?only=${fetchEventsParams.fields}&page=20&scroll=next_upcoming`;
	
	const res = await fetch(fetch_url);
	const result = await res.json();
	
	for(let i in result){
		if( result[i].name.toLowerCase().search(fetchEventsParams.event_name) + 1 !== 0 ) {
			return result[i];
		}
	}
}