import nodemailer from "nodemailer";

const sendEmail = async (
  _id,
  username,
  email,
  amount,
  bankname,
  branch,
  currency,
  slipImage
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "GuardianEarth.Pro@gmail.com",
    to: process.env.EMAIL_USER, // Admin email
    subject: "New Payment Verification Request",
    html: `
        <h2>New Payment Submission</h2>
        <p><strong>Name:</strong> ${username}</p>
        <p><strong>Amount:</strong> ${amount} ${currency}</p>
        <p><strong>Bank:</strong> ${bankname}</p>
        <p><strong>Branch:</strong> ${branch}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <br/>
        <p>Click below to approve or reject:</p>
        <a href="http://localhost:5000/api/email/approve?id=${_id}" 
           style="background-color: green; color: white; padding: 10px; text-decoration: none; border-radius: 5px;">
           ✅ Approve
        </a> 
        &nbsp;&nbsp;
        <a href="http://localhost:5000/api/email/reject?id=${_id}" 
           style="background-color: red; color: white; padding: 10px; text-decoration: none; border-radius: 5px;">
           ❌ Reject
        </a>
      `,
    attachments: [
      {
        filename: "payment_slip.pdf",
        path: slipImage,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
