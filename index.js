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

let getTriggeredTime = async (event_time, next_event_time) => {
	const now = new Date();
	let time_ranges = general_config.time_ranges;
	
	time_ranges.sort(function(a, b) {
		return b - a;
	});
	for(let i in time_ranges){
		let trigger_time = event_time - time_ranges[i]*in_hour;
		if( trigger_time > now.getTime() ) return trigger_time;
	}
	
	return next_event_time - time_ranges[0]*in_hour;
}
 
agenda.define('Send MeetUp Notification', async (job, done) => {
	const res = await fetch(fetch_url);
	const result = await res.json();	
	
	let event = result[0];		
	const event_time = event.time;
	
	event.time = convertTimeToDate(event.time);
	event.group_name = fetch_events_params.group_name;
	event.timezone = general_config.timezone;
	
	const trigger_time = await getTriggeredTime(event_time, result[1].time);
	
	let event_json = JSON.stringify(event);	
	await fetch(`${general_config.send_message_url}?event=${event_json}`);
			
	job.schedule(new Date(trigger_time)).save();	
	console.log(`next message in ${new Date(trigger_time)}`);
	
	console.log('message sent at:', new Date().getTime());
	
	
	done();
});

agenda.on('ready', async() =>  {
	//agenda.every(`${general_config.step_length} hours`, 'check');
	const res = await fetch(fetch_url);
	const result = await res.json();
	console.log(result);
	let job = agenda.create('Send MeetUp Notification');
  
	const trigger_time = await getTriggeredTime(result[0].time, result[1].time);	
	job.schedule(new Date(trigger_time)).save();
	console.log(`next message in ${new Date(trigger_time)}`);
 
	agenda.start();
});
 