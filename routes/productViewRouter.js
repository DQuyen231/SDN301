var express = require("express");
const productController = require("../controller/productController");
const productRouter = express.Router();
const {ensureAuthenticated} = require('../config/auth')
productRouter
    .route("/")
    .get(productController.allProduct)
    
module.exports = productController;
