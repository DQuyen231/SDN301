const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        },
        phone:  {
            type: Number,
            require: true,
            unique: true
        },

        address:{
            type: String,
            require : true
        },

        email: {
            type: String,
            require: true
        },
        password:{
            type: String,
            require : true
        },
    }
);

const Customer = mongoose.model("customer", customerSchema)
module.exports = Customer;