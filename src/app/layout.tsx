import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppProvider } from "@/services/appProvider/Provider";
import { metadata as seoMetadata } from "@/services/seo/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = seoMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
