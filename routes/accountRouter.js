var express = require("express");
const Account = require("../model/account");
const bcrypt = require('bcrypt')
const accountRouter = express.Router();

accountRouter
    .route("/")
    .all((req, res, next) => {
        res.statusCode = 200,
            res.setHeader("Content-Type", 'application/json')
        next()
    })
    .get((req, res, next) => {
        Account.find({})
            .then((accounts) => {
                res.statusCode = 200,
                    res.json(accounts)
            })
    })
    .post((req, res, next) => {
        const { username, password } = req.body
        let errors = []
        if (password.length < 6) {
            errors.push({ msg: "Password must be at least 6 characters" })
        }
        if (errors.length > 0) {
            res.statusCode = 400,
                res.json(errors)
        }
        else {
            Account.findOne({ username: username })
                .then((account) => {
                    if (account) {
                        res.statusCode = 400
                        errors.push({ msg: "Username already exists" })
                        res.json(errors)
                    } else {
                        const newAccount = new Account({ username, password })
                        bcrypt.hash(newAccount.password, 10, function (err, hash) {
                            if (err) throw err
                            newAccount.password = hash
                            newAccount.save()
                                .then((account) => {
                                    res.json(account)
                                })
                        });
                    }
                })
        }
    })
//module.exports = accountRouter;
