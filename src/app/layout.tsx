import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import * as React from "react";

import "@/styles/globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";

import { siteConfig } from "@/constant/config";
import { PreloadProvider } from "@/context/PreloadContext";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: `/favicon/site.webmanifest`,
  authors: [
    {
      name: "Nilay Nath Sharan",
      url: "https://www.nilaysharan.com/",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="luh5nd1ELZCFHhe7YjWxXZVk55Ctg7h1YvZR1azguBk"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" enableSystem={false}>
          <Header />
          <PreloadProvider>
            <div id="skip-nav">{children}</div>
          </PreloadProvider>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
