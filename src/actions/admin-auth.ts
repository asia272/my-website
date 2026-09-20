"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";

import { api } from "../../convex/_generated/api";

import {
    generateOtp,
    getMaxOtpAttempts,
    getOtpExpiry,
    hashOtp,
} from "@/lib/auth/otp";

import {
    ADMIN_SESSION_COOKIE,
    generateSessionToken,
    getSessionDurationSeconds,
    getSessionExpiry,
    hashSessionToken,
} from "@/lib/auth/admin-session";

import { sendAdminOtpEmail } from "@/lib/brevo";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

const adminEmail = process.env.ADMIN_EMAIL!;

if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured.");
}

if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not configured.");
}

const convex = new ConvexHttpClient(convexUrl);

const OTP_RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Request an admin login OTP.
 */
export async function requestAdminOtp(email: string) {
    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
        return {
            success: false,
            message: "Please enter a valid email address.",
        };
    }

    const configuredAdminEmail = normalizeEmail(adminEmail);

    /**
     * Do not reveal whether an email belongs to the admin.
     */
    if (normalizedEmail !== configuredAdminEmail) {
        return {
            success: false,
            message: "Unable to process this request.",
        };
    }

    const existingChallenge = await convex.query(
        api.adminOtpChallenges.getByEmail,
        {
            email: normalizedEmail,
        },
    );

    /**
     * Prevent OTP spam.
     */
    if (
        existingChallenge &&
        Date.now() - existingChallenge.lastSentAt <
        OTP_RESEND_COOLDOWN_MS
    ) {
        const remainingSeconds = Math.ceil(
            (OTP_RESEND_COOLDOWN_MS -
                (Date.now() - existingChallenge.lastSentAt)) /
            1000,
        );

        return {
            success: false,
            message: `Please wait ${remainingSeconds} seconds before requesting another code.`,
        };
    }

    const otp = generateOtp();
    const codeHash = hashOtp(otp);

    const now = Date.now();
    const expiresAt = getOtpExpiry();

    await convex.mutation(api.adminOtpChallenges.create, {
        email: normalizedEmail,
        codeHash,
        expiresAt,
        lastSentAt: now,
        createdAt: now,
    });

    try {
        await sendAdminOtpEmail({
            recipientEmail: normalizedEmail,
            otp,
        });
    } catch (error) {
        console.error("Failed to send admin OTP email:", error);

        /**
         * Remove the challenge if email delivery fails.
         * This prevents an OTP from existing that the admin never received.
         */
        const failedChallenge = await convex.query(
            api.adminOtpChallenges.getByEmail,
            {
                email: normalizedEmail,
            },
        );

        if (failedChallenge) {
            await convex.mutation(api.adminOtpChallenges.remove, {
                id: failedChallenge._id,
            });
        }

        return {
            success: false,
            message: "Unable to send the verification code. Please try again.",
        };
    }

    return {
        success: true,
        message: "Verification code sent successfully.",
    };
}

/**
 * Verify the OTP and create an authenticated admin session.
 */
export async function verifyAdminOtp(
    email: string,
    otp: string,
) {
    const normalizedEmail = normalizeEmail(email);
    const normalizedOtp = otp.trim();

    if (!isValidEmail(normalizedEmail)) {
        return {
            success: false,
            message: "Invalid verification request.",
        };
    }

    if (!/^\d{6}$/.test(normalizedOtp)) {
        return {
            success: false,
            message: "Please enter the 6-digit verification code.",
        };
    }

    const configuredAdminEmail = normalizeEmail(adminEmail);

    if (normalizedEmail !== configuredAdminEmail) {
        return {
            success: false,
            message: "Invalid verification request.",
        };
    }

    const challenge = await convex.query(
        api.adminOtpChallenges.getByEmail,
        {
            email: normalizedEmail,
        },
    );

    if (!challenge) {
        return {
            success: false,
            message: "This verification code is invalid or has expired.",
        };
    }

    /**
     * Check expiration first.
     */
    if (Date.now() > challenge.expiresAt) {
        await convex.mutation(api.adminOtpChallenges.remove, {
            id: challenge._id,
        });

        return {
            success: false,
            message: "This verification code has expired. Please request a new one.",
        };
    }

    /**
     * Prevent unlimited OTP guessing.
     */
    if (challenge.attempts >= getMaxOtpAttempts()) {
        await convex.mutation(api.adminOtpChallenges.remove, {
            id: challenge._id,
        });

        return {
            success: false,
            message:
                "Too many verification attempts. Please request a new code.",
        };
    }

    const submittedHash = hashOtp(normalizedOtp);

    /**
     * Compare the submitted OTP hash with the stored hash.
     */
    if (submittedHash !== challenge.codeHash) {
        const attempts = await convex.mutation(
            api.adminOtpChallenges.incrementAttempts,
            {
                id: challenge._id,
            },
        );

        if (attempts >= getMaxOtpAttempts()) {
            await convex.mutation(api.adminOtpChallenges.remove, {
                id: challenge._id,
            });

            return {
                success: false,
                message:
                    "Too many verification attempts. Please request a new code.",
            };
        }

        return {
            success: false,
            message: "Incorrect verification code.",
        };
    }

    /**
     * OTP is valid.
     * Remove it immediately so it cannot be reused.
     */
    await convex.mutation(api.adminOtpChallenges.remove, {
        id: challenge._id,
    });

    /**
     * Generate a cryptographically secure session token.
     */
    const sessionToken = generateSessionToken();
    const tokenHash = hashSessionToken(sessionToken);

    const now = Date.now();
    const expiresAt = getSessionExpiry();

    /**
     * Only one active admin session at a time.
     */
    await convex.mutation(
        api.adminSessions.removeAllForEmail,
        {
            email: normalizedEmail,
        },
    );

    await convex.mutation(api.adminSessions.create, {
        tokenHash,
        email: normalizedEmail,
        expiresAt,
        createdAt: now,
        lastUsedAt: now,
    });

    /**
     * Store ONLY the raw session token in the HttpOnly cookie.
     */
    const cookieStore = await cookies();

    cookieStore.set({
        name: ADMIN_SESSION_COOKIE,
        value: sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: getSessionDurationSeconds(),
    });

    return {
        success: true,
        message: "Authentication successful.",
    };
}

/**
 * Log the admin out.
 */
export async function logoutAdmin() {
    const cookieStore = await cookies();

    const sessionToken = cookieStore.get(
        ADMIN_SESSION_COOKIE,
    )?.value;

    if (sessionToken) {
        const tokenHash = hashSessionToken(sessionToken);

        const session = await convex.query(
            api.adminSessions.getByTokenHash,
            {
                tokenHash,
            },
        );

        if (session) {
            await convex.mutation(api.adminSessions.remove, {
                id: session._id,
            });
        }
    }

    cookieStore.delete(ADMIN_SESSION_COOKIE);

    redirect("/admin/login");
}