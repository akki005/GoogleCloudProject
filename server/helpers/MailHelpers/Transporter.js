const nodeMailer = require('nodemailer');
const MailConfigs = require('../../config/MailServer/config');
const debug_err = require('debug')('Errors');
const debug_success = require('debug')('Success');

let transporter = nodeMailer.createTransport({
    service: MailConfigs.SMTP_SERVICE, // no need to set host or port etc.
    auth: {
        user: MailConfigs.SMTP_USER,
        pass: MailConfigs.SMTP_PASSWORD
    }
});


module.exports.sendMail = function (email, cb) {
    let message = {
        from: MailConfigs.EMAIL_VARIFICATION_FROM,
        to: email,
        subject: MailConfigs.EMAIL_VARIFICATION_SUBJECT,
        html: MailConfigs.EMAIL_VARIFICATION_HTML
    }
    transporter.sendMail(message, function (err) {
        if (err) {
            debug_err("Mail not send :: %O",err);
            cb(err, null);
        } else {
            debug_success("Mail sent to user :: %s",email);            
            cb(null, true);
        }
    });
}