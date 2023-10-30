// routes/storeRouter.js
const express = require('express');
const storeRouter = express.Router();
const StoreController = require('../controller/storeController');

storeRouter.route('/').get(StoreController.index).post(StoreController.create);
storeRouter.route('/edit/:storeId').get(StoreController.getInfo).put(StoreController.update);
storeRouter.route('/delete/:storeId').get(StoreController.remove);

module.exports = storeRouter;
