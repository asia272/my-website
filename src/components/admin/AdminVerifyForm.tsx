
"use client";

import {
    FormEvent,
    useEffect,
    useState,
} from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Loader2,
    ShieldCheck,
} from "lucide-react";

import {
    requestAdminOtp,
    verifyAdminOtp,
} from "@/actions/admin-auth";

const EMAIL_STORAGE_KEY =
    "admin_verification_email";

export default function AdminVerifyForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const [isLoading, setIsLoading] =
        useState(false);

    const [isResending, setIsResending] =
        useState(false);

    const [error, setError] = useState("");

    const [resendCooldown, setResendCooldown] =
        useState(0);

    useEffect(() => {
        const storedEmail =
            sessionStorage.getItem(
                EMAIL_STORAGE_KEY,
            );

        if (!storedEmail) {
            router.replace("/admin/login");
            return;
        }

        setEmail(storedEmail);
    }, [router]);

    useEffect(() => {
        if (resendCooldown <= 0) {
            return;
        }

        const timer = window.setInterval(() => {
            setResendCooldown((current) =>
                Math.max(current - 1, 0),
            );
        }, 1000);

        return () => {
            window.clearInterval(timer);
        };
    }, [resendCooldown]);

    function handleOtpChange(
        value: string,
    ) {
        const numericValue =
            value.replace(/\D/g, "").slice(0, 6);

        setOtp(numericValue);
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        if (!email) {
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const result = await verifyAdminOtp(
                email,
                otp,
            );

            if (!result.success) {
                setError(result.message);
                return;
            }

            sessionStorage.removeItem(
                EMAIL_STORAGE_KEY,
            );

            router.replace("/admin/dashboard");
            router.refresh();
        } catch (error) {
            console.error(error);

            setError(
                "Something went wrong. Please try again.",
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function handleResend() {
        if (!email || resendCooldown > 0) {
            return;
        }

        setError("");
        setIsResending(true);

        try {
            const result =
                await requestAdminOtp(email);

            if (!result.success) {
                setError(result.message);
                return;
            }

            setOtp("");
            setResendCooldown(60);
        } catch (error) {
            console.error(error);

            setError(
                "Unable to resend the verification code.",
            );
        } finally {
            setIsResending(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div
                    className="
            mx-auto
            mb-5
            flex
            size-14
            items-center
            justify-center
            rounded-2xl
            bg-primary/10
            text-primary
          "
                >
                    <ShieldCheck className="size-6" />
                </div>

                <h3 className="mb-4 font-semibold">
                    Verify your login
                </h3>

                <p className="mt-2 text-sm text-secondary">
                    We sent a 6-digit verification code to
                </p>

                <p className="mt-1 break-all text-sm font-medium italic">
                    {email || "your email"}
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label
                        htmlFor="otp"
                        className="mb-2 block text-sm font-medium"
                    >
                        Verification Code
                    </label>

                    <input
                        id="otp"
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="000000"
                        value={otp}
                        onChange={(event) =>
                            handleOtpChange(
                                event.target.value,
                            )
                        }
                        disabled={isLoading}
                        required
                        className="
              h-14
              rounded-xl
              bg-background
              text-center
              text-2xl
              font-semibold
              tracking-[0.45em]
              focus:ring-2
              focus:ring-primary/20
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
                    />
                </div>

                {error && (
                    <div
                        role="alert"
                        className="
              text-sm
              text-red-500
            "
                    >
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={
                        isLoading ||
                        otp.length !== 6
                    }
                    className="
            custom-btn
            h-12
            w-full
            gap-2
          "
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Verify & Continue"
                    )}
                </button>
            </form>

            <div className="flex items-center justify-between gap-4 text-sm">
                <button
                    type="button"
                    onClick={() =>
                        router.push("/admin/login")
                    }
                    className="
            inline-flex
            items-center
            gap-1.5
            text-secondary
            transition
            hover:text-primary
          "
                >
                    <ArrowLeft className="size-4" />
                    Change email
                </button>

                <button
                    type="button"
                    onClick={handleResend}
                    disabled={
                        isResending ||
                        resendCooldown > 0
                    }
                    className="
            font-medium
            text-primary
            transition
            hover:opacity-80
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
                >
                    {isResending
                        ? "Sending..."
                        : resendCooldown > 0
                            ? `Resend in ${resendCooldown}s`
                            : "Resend code"}
                </button>
            </div>
        </div>
    );
}

