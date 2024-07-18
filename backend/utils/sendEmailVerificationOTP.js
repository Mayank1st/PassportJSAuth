import transporter from "../config/emailConfig.js"
import EmailVerificationModel from "../models/EmailVerification.js";


const sendEmailVerificationOTP = async(req, user) => {

    // Generating a 4 digit number
    const otp=Math.floor(1000 + Math.random()*9000);


    // Save OTP in database
    await new EmailVerificationModel({userId: user._id, otp:otp}).save();


    // OTP Verification Link
    const otpVerificationLink=`${process.env.FRONTEND_HOST}/account/varify-email`

    await transporter.sendMail({
        from : process.env.EMAIL_FROM,
        to : user.email,
        subject : "OTP - verify your account",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Account</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f7f7f7;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eeeeee;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                    color: #333333;
                }
                .content {
                    padding: 20px 0;
                    text-align: center;
                }
                .content p {
                    font-size: 18px;
                    line-height: 1.6;
                }
                .otp {
                    font-size: 22px;
                    font-weight: bold;
                    color: #ff6f61;
                }
                .footer {
                    text-align: center;
                    padding-top: 20px;
                    border-top: 1px solid #eeeeee;
                    font-size: 14px;
                    color: #aaaaaa;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Verify Your Account</h1>
                </div>
                <div class="content">
                    <p>Dear ${user.name},</p>
                    <p>Thank you for registering with us. Please use the OTP below to verify your email address:</p>
                    <p>Password (OTP) : ${otpVerificationLink}</p>
                    <p class="otp">${otp}</p>
                    <p>This OTP is valid for the next 15 minutes.</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `,
    })
    return otp;
}

export default sendEmailVerificationOTP