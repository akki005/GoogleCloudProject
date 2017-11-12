exports.SMTP_SERVICE = process.env.SMTP_SERVICE;
exports.SMTP_USER = process.env.SMTP_USER;
exports.SMTP_PASSWORD = process.env.SMTP_PASSWORD;
// exports.EMAIL_VARIFICATION_HOST_URL = process.env.HOST_URL;
exports.EMAIL_VARIFICATION_SUBJECT = "PLease verify your email";
exports.EMAIL_VARIFICATION_FROM = `Akash Patel <${process.env.SMTP_USER}>`;