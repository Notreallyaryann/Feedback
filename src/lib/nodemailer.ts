
import nodemailer from 'nodemailer';

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,   
        pass: process.env.EMAIL_PASS,   
    },
});

// Export transporter to use it elsewhere
export { transporter };
