const mongoose = require('mongoose');
const orderSchema = require('./schemas/orderSchema.js');

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;