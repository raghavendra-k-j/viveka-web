"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AppException } from "@/core/exceptions/AppException";
import Cookies from "js-cookie";

export default function TokenLoginPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [error, setError] = useState<AppException | null>(null);

    // Utility: Check if the redirect URL is valid and safe
    const isValidRedirect = (url: string | null): boolean => {
        return !!url && url.startsWith("/") && !url.includes("://");
    };

    useEffect(() => {
        const processLogin = async () => {
            try {
                const accessToken = searchParams.get("accessToken");
                const redirect = searchParams.get("redirect");

                // Step 1: Validate access token
                if (!accessToken) {
                    throw new AppException({
                        message: "Access token missing",
                        description: "No token was provided in the URL.",
                    });
                }

                // Step 2: Validate the redirect URL
                if (!isValidRedirect(redirect)) {
                    throw new AppException({
                        message: "Invalid redirect URL",
                        description: "The redirect URL is not valid.",
                    });
                }

                // Step 3: Save token to cookie
                try {
                    Cookies.set("accessToken", accessToken, {
                        path: "/",
                        secure: true,
                        sameSite: "Strict",
                        expires: 1,
                    });
                } catch (e) {
                    throw new AppException({
                        message: "Failed to set access token",
                        description: "Unable to save the access token to cookies.",
                        data: e,
                    });
                }

                // Step 4: Redirect
                router.replace(redirect!);

            } catch (err) {
                const ex = AppException.fromAny(err);
                console.error(ex.toString());
                setError(ex);
            }
        };

        processLogin();
    }, [searchParams, router]);

    if (error) {
        return (
            <div style={{ padding: "2rem", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
                <h2>Login Failed</h2>
                <p><strong>{error.message}</strong></p>
                {error.hasDesc() && <p>{error.description}</p>}
                <Link href="/" style={{ color: "#0070f3", textDecoration: "underline" }}>
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <p>Logging you in, please wait...</p>
        </div>
    );
}
