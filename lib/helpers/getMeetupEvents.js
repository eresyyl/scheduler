const fetch = require('node-fetch');
const fetchEventsParams = require('../../config/meetup_event.json');

module.exports = async(page) => {
	const fetch_url = `https://api.meetup.com/${fetchEventsParams.group_name}/events?only=${fetchEventsParams.fields}&page=${page}`;
	
	const res = await fetch(fetch_url);
	const result = await res.json();
	
	return result;
}