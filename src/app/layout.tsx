import type {Metadata} from "next";
import {Inter} from "next/font/google";

import {cn} from "@/lib/utils";
import {QueryProvider} from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Team Workspaces",
    description: "Plan, track, and manage agile and software development projects. Customize workflow, collaborate, and release great software",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "antialiased min-h-screen")}>
                <QueryProvider>
                    <Toaster richColors theme="light" />
                    {children}
                </QueryProvider>
            </body>
        </html>
    );
}
