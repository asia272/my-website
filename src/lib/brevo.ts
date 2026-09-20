import { BrevoClient } from "@getbrevo/brevo";

const apiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.BREVO_SENDER_EMAIL;
const senderName = process.env.BREVO_SENDER_NAME;

if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured.");
}

if (!senderEmail) {
    throw new Error("BREVO_SENDER_EMAIL is not configured.");
}

if (!senderName) {
    throw new Error("BREVO_SENDER_NAME is not configured.");
}

const brevo = new BrevoClient({
    apiKey,
    timeoutInSeconds: 15,
    maxRetries: 2,
});

type SendOtpEmailParams = {
    recipientEmail: string;
    otp: string;
};

export async function sendAdminOtpEmail({
    recipientEmail,
    otp,
}: SendOtpEmailParams) {
    const result = await brevo.transactionalEmails.sendTransacEmail({
        subject: "Your Admin Login OTP",
        sender: {
            name: senderName,
            email: senderEmail,
        },
        to: [
            {
                email: recipientEmail,
            },
        ],
        textContent: `Your admin login OTP is ${otp}.

This OTP will expire in 10 minutes.

If you did not request this code, you can safely ignore this email.`,
        htmlContent: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Admin Login OTP</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #0a0a0a;
            font-family: Arial, Helvetica, sans-serif;
          "
        >
          <div
            style="
              max-width: 600px;
              margin: 40px auto;
              padding: 32px;
              background-color: #111111;
              border: 1px solid #2a2a2a;
              border-radius: 16px;
              color: #ffffff;
            "
          >
            <h1
              style="
                margin: 0 0 16px;
                font-size: 24px;
                color: #ffffff;
              "
            >
              Admin Login
            </h1>

            <p
              style="
                margin: 0 0 24px;
                color: #b5b5b5;
                font-size: 15px;
                line-height: 1.6;
              "
            >
              Use the following one-time password to continue to your
              admin dashboard.
            </p>

            <div
              style="
                margin: 24px 0;
                padding: 20px;
                background-color: #181818;
                border: 1px solid #333333;
                border-radius: 12px;
                text-align: center;
              "
            >
              <span
                style="
                  display: block;
                  margin-bottom: 8px;
                  color: #999999;
                  font-size: 12px;
                  text-transform: uppercase;
                  letter-spacing: 2px;
                "
              >
                Your OTP
              </span>

              <strong
                style="
                  font-size: 32px;
                  letter-spacing: 8px;
                  color: #ffffff;
                "
              >
                ${otp}
              </strong>
            </div>

            <p
              style="
                margin: 0 0 8px;
                color: #999999;
                font-size: 14px;
              "
            >
              This code expires in <strong style="color: #ffffff;">10 minutes</strong>.
            </p>

            <p
              style="
                margin: 24px 0 0;
                color: #777777;
                font-size: 13px;
                line-height: 1.6;
              "
            >
              If you did not request this code, you can safely ignore this
              email.
            </p>
          </div>
        </body>
      </html>
    `,
    });

    return result;
}