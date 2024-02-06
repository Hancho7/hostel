const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

module.exports = {
  sendEmail: async (email, subject, templateFile, templateData) => {
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
          return { status: 500, message: error.message, data: null };
        } else {
          console.log("Transporter verification success:", success);
          return { status: 200, message: "Transporter verification success", data: null };
        }
      });

      const currentFilePath = __dirname;
      console.log("currentFilePath", currentFilePath);

      // Construct the templatePath using path.join
      const templatePath = path.join(currentFilePath, templateFile);
      const cleanTemplateFile = templatePath.replace(/^[\/\\]+/, "");
      console.log("templatePath", cleanTemplateFile);

      if (!fs.existsSync(cleanTemplateFile)) {
        console.error(`Template file not found: ${cleanTemplateFile}`);
        return { status: 404, message: "Template file not found", data: null };
      }

      const emailTemplate = await ejs.renderFile(
        cleanTemplateFile,
        templateData
      );

      // Send the email
      const emailSent = await transport.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        html: emailTemplate,
      });

      return { status: 200, message: "Email sent successfully", data: emailSent };
    } catch (error) {
      console.error("Send email error:", error);
      return { status: 500, message: error.message, data: null };
    }
  },
};
