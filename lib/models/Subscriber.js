let mongoose = require('mongoose');
let subscriberSchema = require('./schemas/subscriberSchema.js');

let Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;