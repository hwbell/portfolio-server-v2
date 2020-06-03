var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
);



router.post('/', function (req, res, next) {

  const mailOptions = {
    from: `hbell3@gmail.com`,
    to: 'harold.william.bell@gmail.com',
    subject: `New Contact: ${req.body.email}`,
    text: `${req.body.name} sent the following message from harrybell.me: ${req.body.message}`
  };
  
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.response.body);
      res.send('There was a problem sending your message... Please try again.')
    } else {
      console.log(`Email sent: ${info.response}`);
      console.log(`New Contact: ${req.body.name}`);
      console.log(`Message: ${req.body.message}`);
      console.log(`Email: ${req.body.email}`);

      res.status(200).send({
        message: 'Your message reached its destination.'
      });
    }
  });


  // next();
});

module.exports = router;
