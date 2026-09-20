import { cookies } from "next/headers";
import { ConvexHttpClient } from "convex/browser";

import { api } from "../../convex/_generated/api";

import {
    ADMIN_SESSION_COOKIE,
    hashSessionToken,
} from "@/lib/auth/admin-session";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const adminEmail = process.env.ADMIN_EMAIL;

if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured.");
}

if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not configured.");
}

const convex = new ConvexHttpClient(convexUrl);

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

export async function getAdminSession() {
    const cookieStore = await cookies();

    const sessionToken = cookieStore.get(
        ADMIN_SESSION_COOKIE,
    )?.value;

    if (!sessionToken) {
        return null;
    }

    const tokenHash = hashSessionToken(sessionToken);

    const session = await convex.query(
        api.adminSessions.getByTokenHash,
        {
            tokenHash,
        },
    );

    if (!session) {
        return null;
    }

    /**
     * Check the fixed 7-day session expiry.
     */
    if (Date.now() >= session.expiresAt) {
        await convex.mutation(
            api.adminSessions.remove,
            {
                id: session._id,
            },
        );

        cookieStore.delete(ADMIN_SESSION_COOKIE);

        return null;
    }

    /**
     * Make sure the session belongs to the configured admin.
     */
    if (
        normalizeEmail(session.email) !==
        normalizeEmail(adminEmail!)
    ) {
        await convex.mutation(
            api.adminSessions.remove,
            {
                id: session._id,
            },
        );

        cookieStore.delete(ADMIN_SESSION_COOKIE);

        return null;
    }

    /**
     * Update activity timestamp.
     *
     * This does NOT extend the session expiry.
     */
    await convex.mutation(
        api.adminSessions.updateLastUsed,
        {
            id: session._id,
            lastUsedAt: Date.now(),
        },
    );

    return session;
}

export async function requireAdminSession() {
    const session = await getAdminSession();

    if (!session) {
        return null;
    }

    return session;
}