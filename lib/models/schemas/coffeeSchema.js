const mongoose = require('mongoose');

const coffeeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
    price: {
		type: Number,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	image_url: {
		type: String
	}
});

module.exports = coffeeSchema;