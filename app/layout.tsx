import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-multi-carousel/lib/styles.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Script from "next/script";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import NavBar from "@/components/NavBar/NavBar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prod = process.env.NODE_ENV === "production";

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {prod ? (
          <Script
            data-website-id="453757b5-cab5-47bf-ac14-aa66208bcf7c"
            src="https://umami.aurora.kallumj.xyz/script.js"
            strategy="beforeInteractive"
          />
        ) : (
          <Script
            data-website-id="9b15fa2d-edf4-46f3-bd91-3e886d427fc4"
            src="https://umami.aurora.kallumj.xyz/script.js"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              <NavBar
                className="mb-6"
              />
              <div className="mt-16">{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
