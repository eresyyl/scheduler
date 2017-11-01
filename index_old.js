const Agenda = require('agenda');
const fetch = require('node-fetch');

const mongoConnectionString = require('./config/agenda.json').connection_string;
 
const agenda = new Agenda({db: {address: mongoConnectionString}});

const fetch_events_params = require('./config/meetup_event.json');
const fetch_url = `https://api.meetup.com/${fetch_events_params.group_name}/events?only=${fetch_events_params.fields}&page=${fetch_events_params.page}`;

const general_config = require('./config/general.json');

const in_hour = 60*60*1000;

let convertTimeToDate = function(time){
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long',
		timezone: 'UTC',
		hour: 'numeric',
		minute: 'numeric'
	};
	
	return new Date(
		time + general_config.timezone*in_hour
	).toLocaleString("en-US", options);
}
 
agenda.define('check', async (job, done) => {
	const res = await fetch(fetch_url);
	const result = await res.json();
	let event = result[0];
	const event_time = event.time;
	const now = new Date();
	
	console.log(general_config);
  
	for(let i in general_config.time_ranges){
		let trigger_time = event_time - general_config.time_ranges[i]*in_hour;
		if( trigger_time < now.getTime() && trigger_time + general_config.step_length*in_hour >= now.getTime() ){
			event.time = convertTimeToDate(event.time);
			event.group_name = fetch_events_params.group_name;
			event.timezone = general_config.timezone;
			
			let event_json = JSON.stringify(event);
			
			await fetch(`${general_config.send_message_url}?event=${event_json}`);
			
			console.log('message sent at:', convertTimeToDate(now.getTime()));
			
			break;
		}
	}
	done();
});

agenda.on('ready', function() {
	agenda.every(`${general_config.step_length} hours`, 'check');
 
	agenda.start();
});
 