const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productCategorySchema = new Schema(
    {
        name: {
            type: String,
            require: true
        }
    }
);

const categoryProduct = mongoose.model("categoryProduct", productCategorySchema)
module.exports = categoryProduct;