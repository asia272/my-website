"use server";

import {
    sendClientRequestConfirmationEmail,
    sendNewClientRequestAdminEmail,
    type ClientRequestEmailData,
} from "@/lib/brevo";

export async function sendClientRequestEmails(
    data: ClientRequestEmailData
) {
    await Promise.all([
        sendNewClientRequestAdminEmail(data),
        sendClientRequestConfirmationEmail(data),
    ]);

    return {
        success: true,
    };
}