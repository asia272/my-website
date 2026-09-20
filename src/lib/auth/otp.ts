import { createHash, randomInt } from "node:crypto";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_OTP_ATTEMPTS = 5;

export function generateOtp() {
    const min = 10 ** (OTP_LENGTH - 1);
    const max = 10 ** OTP_LENGTH;

    return randomInt(min, max).toString();
}

export function hashOtp(otp: string) {
    return createHash("sha256").update(otp).digest("hex");
}

export function getOtpExpiry() {
    return Date.now() + OTP_EXPIRY_MS;
}

export function getMaxOtpAttempts() {
    return MAX_OTP_ATTEMPTS;
}