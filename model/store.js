// models/store.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    }
});

const Store = mongoose.model('stores', storeSchema);
module.exports = Store;
