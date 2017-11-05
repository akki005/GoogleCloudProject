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


module.exports.sendMail = function (email, token, host_url,cb) {
    let message = {
        from: MailConfigs.EMAIL_VARIFICATION_FROM,
        to: email,
        subject: MailConfigs.EMAIL_VARIFICATION_SUBJECT,
        html: `<p>Please verify your account by clicking <a href="${host_url}/#/Verify?key=${token}">here</a></p>
                <p>This link will expire after 30 seconds</p>`
    }
    transporter.sendMail(message, function (err) {
        if (err) {
            debug_err("Mail not send :: %O", err);
            cb(err, null);
        } else {
            debug_success("Mail sent to user :: %s", email);
            cb(null, true);
        }
    });
}