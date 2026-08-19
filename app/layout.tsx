import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: { default: "JJWine", template: "%s" },
    description: "Global standards. Local execution in China.",
    openGraph: {
      title: "JJWine — Global standards. Local execution.",
      description: "China production solutions for global wine and beverage brands.",
      type: "website",
      images: [{ url: new URL("/og.png", origin).toString(), width: 1200, height: 630, alt: "JJWine" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "JJWine — Global standards. Local execution.",
      description: "China production solutions for global wine and beverage brands.",
      images: [new URL("/og.png", origin).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
