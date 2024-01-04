var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CodeHub- Sahring code just got easier' });
});

router.get ("/about", function(req, res, next){
  res.render("about", { title:"CodeHub -Sharing Code Just got easier"});

});

router.get("/contact", function(req, res, next){
  res.render("contact", { title:" CodeHub -Sharing code just got easier"});

})
.post(function(req, res, next){
  res.render("Thank you for contacting CodeHub", {title:"CodeHub - Sharing code just got better"});

});

module.exports = router;
