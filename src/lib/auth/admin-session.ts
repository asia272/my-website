import { createHash, randomBytes } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function generateSessionToken() {
    return randomBytes(32).toString("hex");
}

export function hashSessionToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
}

export function getSessionExpiry() {
    return Date.now() + SESSION_DURATION_MS;
}

export function getSessionDurationSeconds() {
    return SESSION_DURATION_MS / 1000;
}