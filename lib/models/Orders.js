const mongoose = require('mongoose'),
	orderSchema = require('./schemas/orderSchema.js');

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;