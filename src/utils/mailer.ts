import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  emailType: "verify" | "reset";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailOptions) => {
  try {
    
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      auth: {
        user: "your-email@example.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      from: "noreply@example.com",
      to: email,
      subject: emailType === "verify" ? "Verify Email" : "Reset Password",
      text:
        emailType === "verify"
          ? "Thank you for signing up!"
          : `To reset your password, please visit http://localhost:3000/reset-password/${userId}`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};
