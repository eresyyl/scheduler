const fetch = require('node-fetch');
const fetch_events_params = require('../../config/meetup_event.json');

module.exports = async(page) => {
	const fetch_url = `https://api.meetup.com/${fetch_events_params.group_name}/events?only=${fetch_events_params.fields}&page=${page}`;
	
	const res = await fetch(fetch_url);
	const result = await res.json();
	
	return result;
}