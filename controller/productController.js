const Products = require('../model/product');

class productController {
    allProduct(req, res, next) {
        Products.find({})
            .then((products) => {
                res.render("product", {
                    title: "List of Products",
                    productData: products,
                    baseURL: req.baseUrl,
                    errormessage: ""
                })
            })
            .catch(next);
    }

}
module.exports = new productController();