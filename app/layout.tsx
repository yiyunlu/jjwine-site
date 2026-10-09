import type { Metadata } from "next";
import { headers } from "next/headers";
import { resolveLang } from "./i18n";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  // Locale-specific title, description, alternates, Open Graph and Twitter
  // metadata come from each page via app/site-metadata.ts.
  return {
    metadataBase: new URL(origin),
    title: { default: "JJWine", template: "%s" },
    description: "Global standards. Local execution in China.",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "32x32" },
      ],
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
