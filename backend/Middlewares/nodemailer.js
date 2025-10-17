const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
require("dotenv").config()

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS,
  },
});

exports.sendmail =async function (email, resetLink) {
 await transport.sendMail({
    from: process.env.MAIL,
    to: email,
    subject: "Password Reset",
    text: `Reset your password using the following link: ${resetLink}`,
  });
};
