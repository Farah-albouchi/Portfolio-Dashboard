
const {createTransport} = require('nodemailer');

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'ecoartteampi@gmail.com',
    pass: 'zwsb opga qbas fwnl',
  },
});

const sendVerificationEmail = (email, code) => {
  const mailOptions = {
    from: 'farahalbouchi@gmail.com',
    to: email,
    subject: 'Password Reset Verification Code',
    text: `Your verification code is ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = sendVerificationEmail;
