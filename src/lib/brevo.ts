import { BrevoClient } from "@getbrevo/brevo";

const apiKey = process.env.BREVO_API_KEY!;
const senderEmail = process.env.BREVO_SENDER_EMAIL!;
const senderName = process.env.BREVO_SENDER_NAME!;
const adminEmail = process.env.ADMIN_EMAIL!;

if (!apiKey) {
  throw new Error("BREVO_API_KEY is not configured.");
}

if (!senderEmail) {
  throw new Error("BREVO_SENDER_EMAIL is not configured.");
}

if (!senderName) {
  throw new Error("BREVO_SENDER_NAME is not configured.");
}

if (!adminEmail) {
  throw new Error("ADMIN_EMAIL is not configured.");
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

export type ClientRequestEmailData = {
  clientName: string;
  email: string;
  phone: string;
  serviceType: string;
  projectDescription: string;
  attachmentUrl?: string | null;
};

/**
 * Escape user-provided values before inserting them into HTML.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Send admin login OTP.
 */
export async function sendAdminOtpEmail({
  recipientEmail,
  otp,
}: SendOtpEmailParams) {
  return await brevo.transactionalEmails.sendTransacEmail({
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
            <html>
                <body
                    style="
                        margin:0;
                        padding:0;
                        background:#f4f4f5;
                        font-family:Arial,Helvetica,sans-serif;
                    "
                >
                    <div
                        style="
                            max-width:600px;
                            margin:40px auto;
                            background:#ffffff;
                            border-radius:16px;
                            padding:40px;
                            box-sizing:border-box;
                        "
                    >
                        <h1
                            style="
                                margin:0 0 20px;
                                font-size:28px;
                                color:#111827;
                            "
                        >
                            Admin Login
                        </h1>

                        <p
                            style="
                                margin:0 0 24px;
                                color:#4b5563;
                                font-size:16px;
                                line-height:1.6;
                            "
                        >
                            Use the following OTP to continue your admin login:
                        </p>

                        <div
                            style="
                                padding:18px;
                                background:#f4f4f5;
                                border-radius:12px;
                                text-align:center;
                                margin-bottom:24px;
                            "
                        >
                            <strong
                                style="
                                    font-size:32px;
                                    letter-spacing:8px;
                                    color:#111827;
                                "
                            >
                                ${escapeHtml(otp)}
                            </strong>
                        </div>

                        <p
                            style="
                                margin:0;
                                color:#6b7280;
                                font-size:14px;
                                line-height:1.6;
                            "
                        >
                            This OTP will expire in 10 minutes.
                        </p>

                        <p
                            style="
                                margin:12px 0 0;
                                color:#6b7280;
                                font-size:14px;
                                line-height:1.6;
                            "
                        >
                            If you did not request this code, you can safely ignore
                            this email.
                        </p>
                    </div>
                </body>
            </html>
        `,
  });
}

/**
 * Send a new client request notification to the admin.
 */
export async function sendNewClientRequestAdminEmail(
  data: ClientRequestEmailData
) {
  const clientName = escapeHtml(data.clientName);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const serviceType = escapeHtml(data.serviceType);
  const projectDescription = escapeHtml(
    data.projectDescription
  );

  const attachmentSection = data.attachmentUrl
    ? `
            <tr>
                <td
                    style="
                        padding:14px 0;
                        border-bottom:1px solid #e5e7eb;
                        font-weight:600;
                        color:#111827;
                    "
                >
                    Attachment
                </td>

                <td
                    style="
                        padding:14px 0;
                        border-bottom:1px solid #e5e7eb;
                    "
                >
                    <a
                        href="${escapeHtml(data.attachmentUrl)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        style="
                            color:#2563eb;
                            text-decoration:none;
                            font-weight:600;
                        "
                    >
                        View attachment
                    </a>
                </td>
            </tr>
        `
    : "";

  return await brevo.transactionalEmails.sendTransacEmail({
    subject: `New Client Request — ${data.clientName}`,
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [
      {
        email: adminEmail,
      },
    ],

    textContent: `New client request received.

Client: ${data.clientName}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.serviceType}

Project description:
${data.projectDescription}

${data.attachmentUrl ? `Attachment: ${data.attachmentUrl}` : ""}`,

    htmlContent: `
            <!DOCTYPE html>
            <html>
                <body
                    style="
                        margin:0;
                        padding:0;
                        background:#f4f4f5;
                        font-family:Arial,Helvetica,sans-serif;
                    "
                >
                    <div
                        style="
                            max-width:700px;
                            margin:40px auto;
                            background:#ffffff;
                            border-radius:16px;
                            padding:40px;
                            box-sizing:border-box;
                        "
                    >
                        <h1
                            style="
                                margin:0 0 8px;
                                font-size:28px;
                                color:#111827;
                            "
                        >
                            New Client Request
                        </h1>

                        <p
                            style="
                                margin:0 0 32px;
                                color:#6b7280;
                                font-size:15px;
                            "
                        >
                            A new project request has been submitted
                            through your website.
                        </p>

                        <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            style="
                                border-collapse:collapse;
                                font-size:15px;
                            "
                        >
                            <tr>
                                <td
                                    style="
                                        padding:14px 0;
                                        border-bottom:1px solid #e5e7eb;
                                        font-weight:600;
                                        color:#111827;
                                    "
                                >
                                    Client
                                </td>

                                <td
                                    style="
                                        padding:14px 0;
                                        border-bottom:1px solid #e5e7eb;
                                        color:#374151;
                                    "
                                >
                                    ${clientName}
                                </td>
                            </tr>

                            <tr>
                                <td
                                    style="
                                        padding:14px 0;
                                        border-bottom:1px solid #e5e7eb;
                                        font-weight:600;
                                        color:#111827;
                                    "
                                >
                                    Email
                                </td>

                                <td
                                    style="
                                        padding:14px 0;
                                        border-bottom:1px solid #e5e7eb;
                                    "
                                >
                                    <a
                                        href="mailto:${email}"
                                        style="
                                            color:#2563eb;
                                            text-decoration:none;
                                        "
                                    >
                                        ${email}
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td
                                    style="
                                        padding:14px 0;
                                        border-bottom:1px solid #e5e7eb;
                                        font-weight:600;
                                        color:#111827;
                                    "
                                >
                                    Phone
                                </td>

                                <td
                                    style="
                                        padding:14px 0;
                                        border-bottom:1px solid #e5e7eb;
                                        color:#374151;
                                    "
                                >
                                    ${phone}
                                </td>
                            </tr>

                            <tr>
                                <td
                                    style="
                                        padding:14px 0;
                                        border-bottom:1px solid #e5e7eb;
                                        font-weight:600;
                                        color:#111827;
                                    "
                                >
                                    Service
                                </td>

                                <td
                                    style="
                                        padding:14px 0;
                                        border-bottom:1px solid #e5e7eb;
                                        color:#374151;
                                    "
                                >
                                    ${serviceType}
                                </td>
                            </tr>

                            ${attachmentSection}
                        </table>

                        <div
                            style="
                                margin-top:32px;
                                padding:24px;
                                background:#f9fafb;
                                border-radius:12px;
                            "
                        >
                            <h2
                                style="
                                    margin:0 0 12px;
                                    font-size:17px;
                                    color:#111827;
                                "
                            >
                                Project Description
                            </h2>

                            <p
                                style="
                                    margin:0;
                                    white-space:pre-wrap;
                                    color:#4b5563;
                                    line-height:1.7;
                                    font-size:15px;
                                "
                            >
                                ${projectDescription}
                            </p>
                        </div>
                    </div>
                </body>
            </html>
        `,
  });
}

/**
 * Send confirmation email to the client.
 */
export async function sendClientRequestConfirmationEmail(
  data: ClientRequestEmailData
) {
  const clientName = escapeHtml(data.clientName);
  const serviceType = escapeHtml(data.serviceType);

  return await brevo.transactionalEmails.sendTransacEmail({
    subject: "We received your project request",
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [
      {
        email: data.email,
      },
    ],

    textContent: `Hi ${data.clientName},

Thank you for contacting us.

We have received your project request for ${data.serviceType}.

Our team will review your request and get back to you as soon as possible.

Best regards,
${senderName}`,

    htmlContent: `
            <!DOCTYPE html>
            <html>
                <body
                    style="
                        margin:0;
                        padding:0;
                        background:#f4f4f5;
                        font-family:Arial,Helvetica,sans-serif;
                    "
                >
                    <div
                        style="
                            max-width:600px;
                            margin:40px auto;
                            background:#ffffff;
                            border-radius:16px;
                            padding:40px;
                            box-sizing:border-box;
                        "
                    >
                        <h1
                            style="
                                margin:0 0 20px;
                                font-size:28px;
                                color:#111827;
                            "
                        >
                            Thanks for reaching out!
                        </h1>

                        <p
                            style="
                                margin:0 0 16px;
                                color:#374151;
                                font-size:16px;
                                line-height:1.7;
                            "
                        >
                            Hi ${clientName},
                        </p>

                        <p
                            style="
                                margin:0 0 16px;
                                color:#4b5563;
                                font-size:15px;
                                line-height:1.7;
                            "
                        >
                            Thank you for contacting us. We've successfully
                            received your project request.
                        </p>

                        <div
                            style="
                                margin:24px 0;
                                padding:20px;
                                background:#f9fafb;
                                border-radius:12px;
                            "
                        >
                            <p
                                style="
                                    margin:0;
                                    color:#6b7280;
                                    font-size:14px;
                                "
                            >
                                Requested service
                            </p>

                            <p
                                style="
                                    margin:6px 0 0;
                                    color:#111827;
                                    font-size:17px;
                                    font-weight:600;
                                "
                            >
                                ${serviceType}
                            </p>
                        </div>

                        <p
                            style="
                                margin:0 0 24px;
                                color:#4b5563;
                                font-size:15px;
                                line-height:1.7;
                            "
                        >
                            We'll review your request and get back to you
                            as soon as possible.
                        </p>

                        <p
                            style="
                                margin:0;
                                color:#111827;
                                font-size:15px;
                                line-height:1.7;
                            "
                        >
                            Best regards,<br />
                            <strong>${escapeHtml(senderName)}</strong>
                        </p>
                    </div>
                </body>
            </html>
        `,
  });
}