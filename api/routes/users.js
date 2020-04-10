var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('landing')
});

module.exports = router;


// show register form
router.get("/register", function(req, res){
  res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
      if(err){
          req.flash("error", err.message);
          return res.render("register");
      }
      passport.authenticate("local")(req, res, function(){
         req.flash("success", "Welcome to Appointment Booker " + user.username);
         res.redirect("landing"); 
      });
  });
});

//show login form
router.get("/login", function(req, res){
  res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
   {
       successRedirect: "/appointment",
       failureRedirect: "/login"
   }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
  req.logout();
  // req.flash("success", "Logged you out!");
  res.redirect("/landing");
});


module.exports = router;
