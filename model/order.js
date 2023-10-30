const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store', // Reference to the Store model
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered'],
        default: 'Pending'
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
