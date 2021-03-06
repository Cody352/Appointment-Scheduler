var Appointment = require("../models/index");


// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkAppointmentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Appointment.findById(req.params.id, function(err, foundAppointment){
           if(err){
            //    req.flash("error", "Campground not found");
               res.redirect("back");
           }  else {
               // does user own the appointment?
            if(foundAppointment.username.id.equals(req.user._id)) {
                next();
            } else {
                // req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        // req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;