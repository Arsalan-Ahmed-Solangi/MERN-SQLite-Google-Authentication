const nodemailer = require("nodemailer");
const sendEmail = (email, name, password) => {

    try {

        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: 'ahmedsolangi347@gmail.com',
                pass: 'your_email_password' //****AddYOURCREDENTIALS******//
            }
        });

        const mailOptions = {
            from: 'MERN SQLITE GOOGLE AUTHENTICATION',
            to: email,
            subject: 'Welcome to our platform!',
            text: `Hello ${name},\n\nYour account has been successfully created!\n\nYour login credentials:\nEmail: ${email}\nPassword: ${password}\n\nThank you for joining us!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });


    } catch (error) {
        console.log(error)
    }

};


module.exports = sendEmail;