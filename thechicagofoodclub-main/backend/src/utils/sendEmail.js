import nodemailer from "nodemailer";
import { EMAIL_NAME, EMAIL_USER, EMAIL_PASS } from "./constants.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  port: 465,
  secure: true,
  // logger: true,
  // debug: true,
  // secureConnection:300000,
  // socketTimeout:false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  tls: {
    rejectUnAuthorized: true,
  },
});

const sendEmail = async (subject, emailContent, recipientEmail) => {
  try {
    await transporter.sendMail({
      from: {
        name: EMAIL_NAME,
        address: EMAIL_USER,
      },
      to: recipientEmail,
      subject: subject,
      html: emailContent,
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // Pass the error up to handle it elsewhere
  }
};
export default sendEmail;
