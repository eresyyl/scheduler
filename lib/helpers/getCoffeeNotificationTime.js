const generalConfig = require('../../config/general.json'),
	getEvents = require('./getMeetupEvents.js');

module.exports = async () => {
	const inHour = 60*60*1000,
	events = await getEvents(1);

	let timeOffset = generalConfig.coffee_notification_offset || 0.5;
	
	return events[0].time - timeOffset*inHour;
};