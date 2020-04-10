var express = require("express");
var path = require("path");
// var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var index = require("./routes/index");
var api = require("./routes/api/index");
var users = require('./routes/users');
var Nexmo = require('nexmo');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
var User = require('./models/user');
var Appointment = require('./models/index');
var flash       = require("connect-flash");



// const nexmo = new Nexmo({
//   apiKey: '',
//   apiSecret: ''
// });

var app = express();
mongoose.Promise = global.Promise;


//This enabled CORS, Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts)
//on a web page to be requested from another domain outside the domain from which the first resource was served
app.all("/*", function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use("/", index);
app.use("/api", api);
app.use('/', users);
app.use(flash());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Cody wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
 res.locals.currentUser = req.user;
 res.locals.error = req.flash("error");
 res.locals.success = req.flash("success");
 next();
});





module.exports = app;
