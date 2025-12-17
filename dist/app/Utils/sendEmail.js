"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../Config/env");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const transporter = nodemailer_1.default.createTransport({
    secure: true,
    auth: {
        user: env_1.envVars.EMAIL_SENDER.SMTP_USER,
        pass: env_1.envVars.EMAIL_SENDER.SMTP_PASS
    },
    host: env_1.envVars.EMAIL_SENDER.SMTP_HOST,
    port: Number(env_1.envVars.EMAIL_SENDER.SMTP_PORT),
});
const sendEmail = async ({ to, subject, templateName, templateData, attachments }) => {
    try {
        const templatePath = path_1.default.join(__dirname, `templates/${templateName}.ejs`);
        const html = await ejs_1.default.renderFile(templatePath, templateData);
        const info = await transporter.sendMail({
            from: env_1.envVars.EMAIL_SENDER.SMTP_FROM,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments?.map(attachment => ({ filename: attachment.filename,
                content: attachment.content,
                contentType: attachment.contentType })),
        });
        console.log("info", info);
        console.log(`${to}: ${info.messageId}`);
    }
    catch (error) {
        console.log("email sending error", error.message);
        throw new AppError_1.default(401, "email error");
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map