const mongoose = require('mongoose');

const coffeeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
    price: {
		type: Array,
		required: true
	},
	currency: {
		type: String,
		required: true
	}
});

module.exports = coffeeSchema;