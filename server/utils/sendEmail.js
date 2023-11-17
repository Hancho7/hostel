import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import fs from "fs";

export const sendEmail = async (email, subject, templateFile, templateData) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      logger: true,
      debug: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
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

    const currentFilePath = new URL(import.meta.url).pathname;
    console.log("currentFilePath", currentFilePath);

    const currentDir = path.dirname(currentFilePath);
    console.log("currentDir", currentDir);

    // Construct the templatePath using path.join
    const templatePath = path.join(currentDir, templateFile);
    const cleanTemplateFile = templatePath.replace(/^[\/\\]+/, '');
    console.log("templatePath", cleanTemplateFile);

    if (!fs.existsSync(cleanTemplateFile)) {
      console.error(`Template file not found: ${cleanTemplateFile}`);
      return "templateFileNotFound";
    }

    const emailTemplate = await ejs.renderFile(cleanTemplateFile, templateData);

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
