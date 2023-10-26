var express = require("express");
var playerRouter = express.Router();
const playerController = require("../controller/playerController");

playerRouter.route("/").get(playerController.index).post(playerController.create);
playerRouter.route("/edit/:playerId").get(playerController.getInfo).put(playerController.update);
playerRouter.route("/delete/:playerId").get(playerController.remove);

module.exports = playerRouter;
