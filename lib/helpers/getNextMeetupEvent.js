const fetch = require('node-fetch');
const timezone = require('../../config/general.json').timezone;
const fetchEventsParams = require('../../config/meetup_event.json');
const getEvents = require('./getMeetupEvents.js');

module.exports = async() => {
	const events = await getEvents();
	return events[0];
}