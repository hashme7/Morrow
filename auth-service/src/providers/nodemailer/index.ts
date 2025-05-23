import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mailerInterface from "../../interface/nodemailer.interface";
dotenv.config();

class Nodemailer implements mailerInterface {
  private readonly transporter: nodemailer.Transporter;
  constructor() {
    if (!process.env.GMAIL || !process.env.GPASSWORD) {
      throw new Error("Missing environment variables GMAIL or GPASSWORD");
    }
    console.log("nodemailer iniatialized");
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GPASSWORD,
      },
      logger: true,
      debug: true,
    });
  }
  async sendForgotPassLink(email: string, link: string): Promise<boolean> {
    let mailOption = {
      from: process.env.GMAIL,
      to: email,
      subject: "Morrow Password Reset Request",
      text: `Dear ${email},

We received a request to reset your password for your Morrow account. Click the link below to reset your password:

Reset Password Link: ${link}

If you didn’t request this, you can safely ignore this email. This link will expire in 15 minutes.

If you need any help, feel free to contact our support team at support@morrow.com.

Best regards,  
The Morrow Team
`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Morrow Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      text-align: center;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin: auto;
    }
    .button {
      display: inline-block;
      background-color: #2980b9;
      color: #fff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 20px;
    }
    .footer {
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Password Reset Request</h2>
    <p>Dear ${email},</p>
    <p>We received a request to reset your password. Click the button below to proceed:</p>
    <a class="button" href="${link}" target="_blank">Reset Password</a>
    <p>If you didn’t request this, you can ignore this email. This link will expire in 15 minutes.</p>
    <div class="footer">
      <p>Need help? Contact our support team at <a href="mailto:support@morrow.com">support@morrow.com</a></p>
      <p>- The Morrow Team</p>
    </div>
  </div>
</body>
</html>`,
    };

    try {
      await this.transporter.sendMail(mailOption);
      console.log("Password reset email sent successfully.");
      return true;
    } catch (error) {
      console.log(`Error sending password reset email: ${error}`);
      return false;
    }
  }

  async sendMail(email: string, code: number): Promise<boolean> {
    let mailOption = {
      from: process.env.GMAIL,
      to: email,
      subject: "Morrow Account Verification - Your Verification Code Inside",
      text: `Dear ${email},

Welcome to Morrow. We're delighted to have you join our growing community of users. To ensure the security of your Morrow account, please confirm your email address by entering the following verification code:

Verification Code: ${code}

If you have any difficulties or require assistance, please reply to this email or contact our support team at support@morrow.com.

Thank you for choosing Morrow. We look forward to helping you achieve your goals.

Sincerely,
The Morrow Team
`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Morrow Account Verification</title>
  <style>
    html {
      background: #e0e0e0; /* Light gray background */
      color: #333; /* Dark gray text */
      margin: 0;
      padding: 0;
      height: 100%;
    }
    body {
      font-family: Arial, sans-serif;
      height: 100%;
      background-color: #e0e0e0;
      color: #333;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px; /* Add padding for better spacing */
    }

    .verification-code {
      background-color: #e5e5e5; /* Light gray background for code */
      border: 1px solid #ccc;
      padding: 10px;
      font-weight: bold;
      font-size: 18px;
      border-radius: 0.5rem;
      color: #333;
      text-align: center;
    }

    .contact-info {
      margin-top: 20px;
      text-align: center; /* Center contact information */
    }

    .header {
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      color: #2980b9; /* Brand blue color */
      padding: 10px; /* Add padding for header */
      border-bottom: 1px solid #ccc; /* Add border for separation */
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="container">
      <p>Morrow</p>
    </div>
  </div>
  <div class="container">

    <p>Dear ${email},</p>
    <p>Welcome to Morrow, your all-in-one SaaS solution! We're thrilled to have you join us. To ensure the security of your Morrow account, we need to verify your email address.</p>
    <br/>
    <p>Please use the following verification code to complete the process:</p>
    <div class="verification-code">

      <p>${code}</p>
    </div>
    <br/>
    <p>If you didn't initiate this verification or encounter any issues, please reply to this email or contact our support team at support@morrow.com. We're here to help.</p>


    <p>Thank you for choosing Morrow!</p>

    <div class="contact-info">
      <p>- The Morrow Team</p>
    </div>
  </div>
</body>
</html>`,
    };
    try {
      await this.transporter.sendMail(mailOption);
      console.log("email send successfully.....");
      return true;
    } catch (error) {
      console.log(`error on sending mail (otp) ${error}`);
      return false;
    }
  }
  sendVerificationMail(id: any, to: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default Nodemailer;
