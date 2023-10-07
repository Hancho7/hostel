import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export const sendEmail = async (email, subject, templateFile, templateData) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    // Verify the transporter configuration
    transport.verify(function (error, success) {
      if (error) {
        console.error("Transporter verification error:", error);
        return "transporterError";
      } else {
        console.log("Transporter verification success:", success);
      }
    });

    const templatePath =
      "C:\\Users\\HELLO\\OneDrive\\Desktop\\hostel\\server\\utils\\verificationEmail.ejs";

    const emailTemplate = await ejs.renderFile(templatePath, templateData);

    // Send the email
    const emailSent = await transport.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: emailTemplate,
    });

    return emailSent;
  } catch (error) {
    console.error("Send email error:", error);
    return "sendEmailError";
  }
};
