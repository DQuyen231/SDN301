const passport = require('passport')
const Accounts = require('../model/account');
const bcrypt = require('bcrypt')

class accountController {
    formSignIn(req, res, next) {
        res.render('login')
    }
    formSignUp(req, res, next) {
        res.render("signup")
    }
    signup(req, res, next) {
        const { username, password, retypePassword } = req.body
        let errors = []
        if (password.length < 6) {
            errors.push({ msg: "Password must be at least 6 characters" })
        }
        if (password !== retypePassword) {
            errors.push({ msg: "Passwords do not match !" })
        }
        if (errors.length > 0) {
            res.render("signup", {
                errors
            })
        }
        else {
            Accounts.findOne({ username: username })
                .then((account) => {
                    if (account) {
                        res.statusCode = 400
                        errors.push({ msg: "Username already exists" })
                        res.render('signup', {
                            errors
                        })
                    } else {
                        const newAccount = new Accounts({ username, password })
                        bcrypt.hash(newAccount.password, 10, function (err, hash) {
                            if (err) throw err
                            newAccount.password = hash
                            newAccount.save()
                                .then((account) => {
                                    res.redirect('login')
                                })
                        });
                    }
                })
        }
    }
    signin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/accounts/dashboard',
            failureRedirect: '/accounts/login',
            failureFlash: true
        })(req, res, next)
    }
    dashboard(req, res, next) {
        res.render('home', {
            account: req.user
        })
    }
    logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err) }
            req.flash('success_msg', 'Youve logged out')
            res.redirect('/')
        })
    }
}
module.exports = new accountController;