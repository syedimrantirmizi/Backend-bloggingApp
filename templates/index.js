export const Otptemplate = (otp, name) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #e9e9e9;
            }
            .header img {
                max-width: 100px;
            }
            .content {
                padding: 20px 0;
                text-align: center;
            }
            .content h1 {
                color: #333333;
            }
            .content p {
                color: #666666;
                line-height: 1.6;
            }
            .otp {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 25px;
                font-size: 24px;
                font-weight: bold;
                color: #333333;
                background-color: #f9f9f9;
                border: 1px solid #dddddd;
                border-radius: 5px;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #999999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <h1>Email Verification</h1>
                <p>Hi ${name},</p>
                <p>Thank you for registering with us. Please use the following OTP to verify your email address:</p>
                <div class="otp">${otp}</div>
                
            </div>
            <div class="footer">
                <p>If you did not create an account, no further action is required.</p>
                <p>&copy; 2024 Company Name. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
