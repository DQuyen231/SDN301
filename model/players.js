const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const playerSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        image: {
            type: String
        },
        club:{
            type: String,
            require: true
        },
        position: {
            type: String,
            require : true
        },
        goals: {
            type: Number,
            require : true
        },
        isCaptain:{
            type: Boolean,
            require : true
        }
    }
);

const Player = mongoose.model("players", playerSchema)
module.exports = Player;