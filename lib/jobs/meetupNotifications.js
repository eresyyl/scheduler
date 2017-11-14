const fetch = require('node-fetch'),
	generalConfig = require('../../config/general.json'),
	fetchEventsParams = require('../../config/meetup_event.json'),
	convertTimeToDate = require('../helpers/convertTimeToDate.js'),
	getTriggeredTime = require('../helpers/getTriggeredTime.js'),
	getEvents = require('../helpers/getMeetupEvents.js');
 
module.exports = function(agenda) {
	agenda.define('Send MeetUp Notification', async (job, done) => {		
		const events = await getEvents(1);
		let event = events[0];
		
		event.time = convertTimeToDate(event.time);
		event.group_name = fetchEventsParams.group_name;
		event.timezone = generalConfig.timezone;
		
		const trigger_time = await getTriggeredTime();
		
		const eventJson = encodeURIComponent(JSON.stringify(event));
		const subscriberJson = encodeURIComponent(JSON.stringify(job.attrs.data));
		await fetch(`${generalConfig.send_message_url}?event=${eventJson}&subscriber=${subscriberJson}`);
				
		job.schedule(new Date(trigger_time)).save();	
		console.log(`next message in ${new Date(trigger_time)}, response_path = ${job.attrs.data.response_path}`);
		
		console.log('message sent at:', new Date());
		
		
		done();
	});
}