import nodemailer from "nodemailer";
import { User } from "@/models/user.model";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

interface EmailOptions {
  email: string;
  emailType: "verify" | "reset";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailOptions) => {
  try {
    const token = uuidv4();
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    if (emailType === "verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpires: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpires: Date.now() + 1800000, // 30 minutes
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string, 10), // Ensure port is an integer
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: emailType === "verify" ? "Verify Email" : "Reset Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "verify" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};
