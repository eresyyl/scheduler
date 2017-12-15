const mongoose = require('mongoose');
const coffeeSchema = require('./schemas/coffeeSchema.js');

const Coffee = mongoose.model('Coffee', coffeeSchema);

module.exports = Coffee;