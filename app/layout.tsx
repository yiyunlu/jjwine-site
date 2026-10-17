import type { Metadata } from "next";
import { headers } from "next/headers";
import { resolveLang } from "./i18n";
import "./fonts.css";
import "./globals.css";
import "./v2-home.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: { default: "JJWine", template: "%s" },
    description: "Global standards. Local execution in China.",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "32x32" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-jjwine-pathname") ?? "/";
  return (
    <html lang={resolveLang(pathname)}>
      <body>{children}</body>
    </html>
  );
}
