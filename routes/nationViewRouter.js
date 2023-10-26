var express = require("express");

const nationController = require("../controller/nationController");
const nationRouter = express.Router();

nationRouter
  .route("/")
  .get(nationController.index)
  .post(nationController.create);

nationRouter
  .route("/edit/:nationId")
  .get(nationController.formData)
  .put(nationController.update);

nationRouter.route("/delete/:nationId").get(nationController.remove);
module.exports = nationRouter;
