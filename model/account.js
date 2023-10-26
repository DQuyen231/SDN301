const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        },
        password:{
            type: String,
            require : true
        },
    }
);

const Account = mongoose.model("accounts", accountSchema)
module.exports = Account;