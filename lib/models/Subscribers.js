const mongoose = require('mongoose');
const subscriberSchema = require('./schemas/subscriberSchema.js');

const Subscribers = mongoose.model('Subscribers', subscriberSchema);

module.exports = Subscribers;