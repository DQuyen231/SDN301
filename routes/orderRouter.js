const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controller/orderController');

orderRouter.route('/').get(orderController.index).post(orderController.create);
orderRouter.route('/edit/:orderId').get(orderController.getInfo).put(orderController.update);
orderRouter.route('/delete/:orderId').get(orderController.remove);

module.exports = orderRouter;
