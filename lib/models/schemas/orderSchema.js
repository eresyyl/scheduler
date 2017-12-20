const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	response_path: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true
	},
    items: {
		type: Array,
		required: true
	},
	amount: {
		type: Array,
		required: true
	},
	creation_date: {
		type: Number,
		required: true
	},
	verification_date: {
		type: Number
	},
	verified: {
		type: Boolean
	}
});

module.exports = orderSchema;