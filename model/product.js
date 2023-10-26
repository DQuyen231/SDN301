const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        productName: {
            type: String,
            require: true
        },
        description:{
            type: String,
        },
        category: {
            type: String,
            require : true
        }
    }
);

const Product = mongoose.model("products", productSchema)
module.exports = Product;