var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override");
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

var indexRouter = require('./routes/index');
var nationViewRouter = require('./routes/nationViewRouter')
var playerViewRouter = require('./routes/playerViewRouter')
var accountRouter = require('./routes/accountViewRouter')
const cors = require('cors')
const { default: mongoose } = require("mongoose");


var app = express();
require('./config/passport')(passport);
app.use(session({
  secret: 'season3 is in your heart !!!',
  saveUninitialized: true,
  resave: true
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})
const url = "mongodb://127.0.0.1:27017/football"
const connect = mongoose.connect(url);
connect.then((data) => {
  console.log("Connect OK !!")
})
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride("_method")); // de form dung duoc method put,...
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));


app.use("/", indexRouter)
app.use("/nation", nationViewRouter);
app.use("/player", playerViewRouter);
app.use("/accounts", accountRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
