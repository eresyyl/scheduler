const fetch = require('node-fetch'),
	general_config = require('../../config/general.json'),
	fetch_events_params = require('../../config/meetup_event.json'),
	convertTimeToDate = require('../helpers/convertTimeToDate.js'),
	getTriggeredTime = require('../helpers/getTriggeredTime.js'),
	getEvents = require('../helpers/getMeetupEvents.js');
 
module.exports = function(agenda) {
	agenda.define('Send MeetUp Notification', async (job, done) => {		
		const events = await getEvents(1);
		let event = events[0];
		
		event.time = convertTimeToDate(event.time);
		event.group_name = fetch_events_params.group_name;
		event.timezone = general_config.timezone;
		
		const trigger_time = await getTriggeredTime();
		
		const event_json = encodeURIComponent(JSON.stringify(event));
		const subscriber_json = encodeURIComponent(JSON.stringify(job.attrs.data.subscriber));
		await fetch(`${general_config.send_message_url}?event=${event_json}&subscriber=${subscriber_json}`);
				
		job.schedule(new Date(trigger_time)).save();	
		console.log(`next message in ${new Date(trigger_time)}, response_path = ${job.attrs.data.subscriber.response_path}`);
		
		console.log('message sent at:', new Date());
		
		
		done();
	});
}