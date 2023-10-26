const passport = require('passport')
const bcrypt = require('bcrypt')
const Accounts = require('../model/account')
const LocalStrategy = require('passport-local').Strategy

module.exports = function () {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            Accounts.findOne({ username: username })
                .then((account) => {
                    if (!account) {
                        return done(null, false, { message: 'User Not Exists !' })
                    }
                    bcrypt.compare(password, account.password, (err, isMatch) => {
                        if (err) throw err
                        if (isMatch) {
                            return done(null, account)
                        } else {
                            return done(null, false, { message: 'Password does not match with this account !' })
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )
    passport.serializeUser((account, done) => {
        done(null, account._id)
    })
    passport.deserializeUser((id, done) => {
        Accounts.findById(id, (err, account) => {
            done(err, account)
        })
    })
}