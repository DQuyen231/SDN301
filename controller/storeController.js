// controllers/storeController.js
const Store = require('../model/store');

class StoreController {
    index(req, res, next) {
        Store.find({})
            .then((stores) => {
                res.render('store', {
                    title: 'List of Stores',
                    storeData: stores,
                    baseUrl: req.baseUrl,
                });
            })
            .catch(next);
    }

    create(req, res, next) {
        const storeName = req.body.name;
        Store.findOne({ name: storeName }).then((store) => {
            if (store !== null) {
                res.render('error', { errormessage: 'Store already exists', baseUrl: req.baseUrl });
            } else {
                const newStore = new Store(req.body);
                newStore
                    .save()
                    .then(() => res.redirect('/store'));
            }
        });
    }

    getInfo(req, res, next) {
        const storeId = req.params.storeId;
        Store.findById(storeId).then((store) => {
            res.render('storeDetail', {
                title: 'Store Information',
                store,
                baseUrl: req.baseUrl,
            });
        });
    }

    update(req, res, next) {
        const storeID = req.params.storeId;
        const details = req.body;
        Store.updateOne({ _id: storeID }, details).then(() =>
            res.redirect('/store')
        );
    }

    remove(req, res, next) {
        const storeID = req.params.storeId;
        Store.deleteOne({ _id: storeID }).then(() =>
            res.redirect('/store')
        );
    }
}

module.exports = new StoreController();
