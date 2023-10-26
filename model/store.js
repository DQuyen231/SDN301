const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const storeSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true
        },

        address:{
            type: String,
            require : true
        },

        services: {
            type: [String],
            require: true
        },
    }
);

const Store = mongoose.model("store", storeSchema)
module.exports = Store;