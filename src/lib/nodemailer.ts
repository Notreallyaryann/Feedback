// src/lib/nodemailer.ts
import nodemailer from 'nodemailer';

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use the appropriate email provider, e.g., 'gmail', 'outlook', etc.
    auth: {
        user: process.env.EMAIL_USER,   // Your email address, stored in an environment variable
        pass: process.env.EMAIL_PASS,   // Your email password or app-specific password
    },
});

// Export transporter to use it elsewhere
export { transporter };
