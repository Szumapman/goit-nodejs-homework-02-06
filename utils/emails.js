const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
const jwt = require('jsonwebtoken');
require("dotenv").config();


const transport = Nodemailer.createTransport(
    MailtrapTransport({
      token: process.env.EMAIL_TOKEN,
    })
);

const sender = {
    address: process.env.SENDER_EMAIL,
    name: process.env.SENDER_NAME,
  };

  
const sendVerificationEmail = async (email, userId) => {
    const verificationToken = jwt.sign({ id: userId }, process.env.VERIFICATION_TOKEN_SECRET, { expiresIn: '7d' });
    const link = `http://localhost:3000/api/users/verify/${verificationToken}`
    return transport.sendMail({
        from: sender,
        to: [email],
        subject: "Please verify your email",
        html: `<a href="${link}">Click here to verify your email</a><p>or copy and paste this link:<br> ${link}</p>`,
        text: `Copy and paste this link to verify your email: ${link}`,
    }).then(console.log("Email sent")).catch(console.error);
};

module.exports = { sendVerificationEmail };