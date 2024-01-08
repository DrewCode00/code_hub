var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);


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
  req.checkBody("name", "Invalid name").notEmpty();
  req.checkBody("Email", "Invalid email").isEmail();
  req.checkBody("message", "Empty message").notEmpty();
  
  var errors = req.validationErrors();

  if(errors){
    res.render("contact",{
      title: "CodeHub -- Sharing Code just got better.",
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      errorMessage: errors
    });
  }else{
    var mailOptions={
      from:'Codehub <no-reply@codehub.com>',
      to:'demo.codehub@gmail.com',
      Subject: 'You have got a new message from Visitor ✌️',


    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return console.log(error);

      }
      res.render("Thank you for contacting CodeHub", {title:"CodeHub - Sharing code just got better"});

    })

   
  }


 
});

module.exports = router;
