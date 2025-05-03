import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async ({ to = "shakyanirmani1999@gmail.com", subject, text, html }) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER_ADMIN,
          pass: process.env.EMAIL_PASS_ADMIN,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      const mailOptions = {
        from: `"Disaster Alert System" <${process.env.EMAIL_USER_ADMIN}>`,
        to,
        subject,
        text,
        html,
      };
  
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully.");
    } catch (err) {
      console.error("❌ Failed to send email:", err);
    }
  };  

export default sendEmail;
