const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const nationSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        image:{
            type: String,
        },
        description: {
            type: String,
            require : true
        }
    }
);

const Nation = mongoose.model("nations", nationSchema)
module.exports = Nation;