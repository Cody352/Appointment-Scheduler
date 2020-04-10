var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});


router.get('/appointment', function(req, res){
  res.render('appointment')
});

module.exports = router;
