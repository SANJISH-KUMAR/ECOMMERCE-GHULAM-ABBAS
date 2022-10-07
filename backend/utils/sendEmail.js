const nodemailer = require('nodemailer');

//options are email, subject , message from authController.js exports.forgotPassword function
const sendEmail = async(options) => {
    // from mailtrap site

    // Your email and password for mailtrap are stored in mailtrap.io server
    // Sandbox->Inboxes->MyInbox->SMTP settings->Show Credentials
    // Host: smtp.mailtrap.io
    // Port: 25 or 465 or 587 or 2525

    // Username:  8e7f06b60186aa
    // Password:  04d043a0411f6c

    const transporter = nodemailer.createTransport({
        //SMTP_HOST = smtp.mailtrap.io
        host: process.env.SMTP_HOST,
        //SMTP_PORT = 2525
        port: process.env.SMTP_PORT,
        auth: {
            //SMTP_EMAIL = e7a82203a9800
            user: process.env.SMTP_EMAIL,
            //SMTP_PASSWORD=8eb5210792779B
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const message = {
        //SMTP_FROM_NAME=shopIT
        //SMTP_FROM_EMAIL =noreply@shopit.com
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(message);
};

module.exports = sendEmail;