var express = require("express");
const accountController = require("../controller/accountController");
const accountRouter = express.Router();
const {ensureAuthenticated} = require('../config/auth')
accountRouter
    .route("/")
    .get(accountController.formSignUp)
    .post(accountController.signup)
accountRouter
    .route("/login")
    .get(accountController.formSignIn)
    .post(accountController.signin)
accountRouter
    .route('/dashboard')
    .get(ensureAuthenticated,accountController.dashboard)
accountRouter
    .route('/logout')
    .get(accountController.logout)
    
module.exports = accountRouter;
