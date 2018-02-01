const generalConfig = require('../../config/general.json'),
	getEvent = require('./getNextMeetupEvent.js');

module.exports = async () => {
	const inHour = 60*60*1000,
	event = await getEvent();

	let timeOffset = generalConfig.coffee_notification_offset || 0.5;
	
	return event.time - timeOffset*inHour;
};