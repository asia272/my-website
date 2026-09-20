"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail } from "lucide-react";

import { requestAdminOtp } from "@/actions/admin-auth";

export default function AdminLoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const result = await requestAdminOtp(email);

            if (!result.success) {
                setError(result.message);
                return;
            }

            sessionStorage.setItem(
                "admin_verification_email",
                email.trim().toLowerCase(),
            );

            router.push("/admin/verify");
        } catch (error) {
            console.error(error);

            setError(
                "Something went wrong. Please try again.",
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                >
                    Admin Email
                </label>

                <div className="relative">
                    <Mail
                        aria-hidden="true"
                        className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              size-4
              -translate-y-1/2
              text-muted-foreground
            "
                    />

                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your admin email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        disabled={isLoading}
                        required
                        className="
              h-12
              w-full
              rounded-xl
              border
              border-border
              bg-background
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              placeholder:text-muted-foreground
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
                    />
                </div>
            </div>

            {error && (
                <div
                    role="alert"
                    className="
        
            px-4
            py-3
            text-sm
            text-red-500
          "
                >
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="
          custom-btn
          flex
          h-12
          w-full
          items-center
          justify-center
          gap-2
          disabled:pointer-events-none
          disabled:opacity-50
        "
            >
                {isLoading ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending code...
                    </>
                ) : (
                    "Continue"
                )}
            </button>
        </form>
    );
}