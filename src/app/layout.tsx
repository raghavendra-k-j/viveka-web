import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { appConfig } from "@/core/config/appConfig";

const appSans = Poppins({
    weight: ["400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    subsets: ["latin", "latin-ext"],
    variable: "--font-app-sans",
});

export const metadata: Metadata = {
    title: appConfig.webPageTitle,
    description: appConfig.webPageDescription,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${appSans.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
