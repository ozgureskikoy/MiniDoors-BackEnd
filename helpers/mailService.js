const nodemailer = require('nodemailer');

exports.sendEmailUsingNodemailer=(to, subject, html, callback)=> {
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'blackslayer2002@hotmail.com',
      pass: 'ozgur1593576482esk'
    }
  });

  const mailOptions = {
    from: 'blackslayer2002@hotmail.com',
    to: to,
    subject: subject,
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      callback(error, null);
    } else {
      console.log('Email sent: ' + info.response);
      callback(null, info.response);
    }
  });
}
