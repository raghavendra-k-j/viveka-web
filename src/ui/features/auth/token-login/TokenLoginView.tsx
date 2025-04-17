"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppException } from "@/core/exceptions/AppException";
import Cookies from "js-cookie";
import { Loader } from "@/ui/widgets/loaders/Loader";
import AppErrorView from "@/ui/widgets/error/AppErrorView";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";

export default function TokenLoginView() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [error, setError] = useState<AppException | null>(null);

    const isValidRedirect = (url: string | null): boolean => {
        return !!url && url.startsWith("/") && !url.includes("://");
    };

    const processLogin = useCallback(async () => {
        try {
            const accessToken = searchParams.get("accessToken");
            const redirect = searchParams.get("redirect");
            if (!accessToken) {
                throw new AppException({
                    message: "Access token missing",
                    description: "No token was provided in the URL.",
                });
            }

            if (!isValidRedirect(redirect)) {
                throw new AppException({
                    message: "Invalid redirect URL",
                    description: "The redirect URL is not valid.",
                });
            }

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

            router.replace(redirect!);

        } catch (err) {
            const ex = AppException.fromAny(err);
            console.error(ex.toString());
            setError(ex);
        }
    }, [searchParams, router]);

    useEffect(() => {
        processLogin();
    }, [processLogin]);

    if (error) {
        const retryButton: ReactNode = (
            <FilledButton onClick={() => {
                setError(null);
                processLogin();
            }}>
                Retry
            </FilledButton>
        );

        return (
            <Centered>
                <AppErrorView
                    message={error.message}
                    description={error.description}
                    actions={[retryButton]}
                />
            </Centered>
        );
    }

    return (
        <Centered>
            <Loader />
        </Centered>
    );
}


function Centered({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center justify-center h-screen">
            {children}
        </div>
    );
}
