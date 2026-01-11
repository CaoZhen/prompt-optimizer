import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI Prompt Optimizer",
    description: "Generate professional AI image prompts",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} bg-[#fafafa] text-slate-900 min-h-screen flex flex-col`}>
                <div className="fixed inset-0 z-[-2] bg-[#fafafa] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <main className="container mx-auto px-4 py-8 flex-1">
                    {children}
                </main>
                <footer className="py-6 text-center text-sm text-slate-400 border-t border-slate-200 bg-[#fafafa]">
                    Copyright @ 2026 Huace AIGC.
                </footer>
            </body>
        </html>
    );
}
