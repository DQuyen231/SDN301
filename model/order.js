const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        orderDate: {
            type: Date,
            require: true
        },

        customer_id:{
            type: String,
        },

        store_id:{
            type: String,
        },

        status: {
            enum:['Pending', 'Processing', 'Delivered'],
            type: String,
            default: 'Pending',
            require : true
        }
    }
);

const Order = mongoose.model("order", orderSchema)
module.exports = Order;