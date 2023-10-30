const Order = require('../model/order');

class OrderController {
    // Get a list of orders
    index(req, res, next) {
        Order.find({})
            .populate('store_id') // Populate the related store information
            .then((orders) => {
                res.render('order', {
                    title: 'List of Orders',
                    orderData: orders,
                    baseUrl: req.baseUrl,
                });
            })
            .catch(next);
    }

    // Create a new order
    create(req, res, next) {
        const { address, store_id, status, totalPrice } = req.body;
        
        const order = new Order({
            address,
            store_id,
            status,
            totalPrice,
        });

        order.save()
            .then(() => res.redirect('/order'))
            .catch(next);
    }

    // Get information about a specific order
    getInfo(req, res, next) {
        const orderId = req.params.orderId;

        Order.findById(orderId)
            .populate('store_id') // Populate the related store information
            .then((order) => {
                res.render('orderDetail', {
                    title: 'Order Information',
                    order,
                    baseUrl: req.baseUrl,
                });
            })
            .catch(next);
    }

    // Update an existing order
    update(req, res, next) {
        const orderId = req.params.orderId;
        const details = req.body;

        Order.findByIdAndUpdate(orderId, details)
            .then(() => res.redirect('/order'))
            .catch(next);
    }

    // Remove an order
    remove(req, res, next) {
        const orderId = req.params.orderId;

        Order.findByIdAndRemove(orderId)
            .then(() => res.redirect('/order'))
            .catch(next);
    }
}

module.exports = new OrderController();
