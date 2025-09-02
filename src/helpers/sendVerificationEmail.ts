// src/helpers/sendVerificationEmail.ts
import { transporter } from '@/lib/nodemailer';
import { ApiResponse } from '@/types/ApiResponse';

// Function to send verification email
export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  // HTML content of the verification email
  const htmlContent = `
    <html lang="en">
      <head>
        <title>Verification Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 8px;
          }
          h2 {
            color: #333;
          }
          p {
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Hello ${username},</h2>
          <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
          <p><strong>${verifyCode}</strong></p>
          <p>If you did not request this code, please ignore this email.</p>
        </div>
      </body>
    </html>
  `;

  // Mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,  
    to: email,                   
    subject: 'Mystery Message Verification Code',
    html: htmlContent,            
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
