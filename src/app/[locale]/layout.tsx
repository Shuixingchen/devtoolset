import './globals.css';
import '@radix-ui/themes/styles.css';
import React from 'react';
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout';
import { Metadata } from 'next'
import { GoogleAnalyticsScript } from "@/components/analytics/GoogleAnalyticsScript";
import { PlausibleAnalyticsScript } from "@/components/analytics/PlausibleAnalyticsScript";
import GoogleAdsenseScript from "@/components/ads/GoogleAdsenseScript";
import { ThemeProvider } from "next-themes"
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })
const sansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: 'runtoweb3.com: 快速上手区块链开发,应用,咨询',
    template: '%s | Runtoweb3'
  },
  description: 'a comminuty of blockchain developer tools, web3, blockchain',
  authors: { name: 'runtoweb3.com', url: 'https://runtoweb3.com/' },
  keywords: 'developer tools, web3, blockchain',
  alternates: {
    canonical: "https://runtoweb3.com/", languages: {
      "en-US": "https://runtoweb3.com/en/",
      "zh-CN": "https://runtoweb3.com/zh/",
    }
  },
  icons: [
    { rel: "icon", type: 'image/png', sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "icon", type: 'image/png', sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", type: 'image/ico', url: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/favicon-180x180.png" },
    { rel: "android-chrome", sizes: "512x512", url: "/favicon-512x512.png" },

  ],
}

import Script from 'next/script'

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-B4ZBJG4VYE"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B4ZBJG4VYE');
            `}
          </Script>
        </head>
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          sansFont.variable
        )}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"

            >
              <Layout>{children}</Layout>
              <GoogleAdsenseScript />
              <GoogleAnalyticsScript />
              <SpeedInsights />
              <PlausibleAnalyticsScript />
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  )
}