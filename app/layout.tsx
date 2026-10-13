import type { Metadata } from "next";
import { headers } from "next/headers";
import { resolveLang } from "./i18n";
import "./globals.css";
import "./v2-home.css";

const fontLinks = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&family=Montserrat:ital,wght@0,400..800;1,400..800&family=Noto+Sans+SC:wght@400;500;700;800&display=swap",
  },
  { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fontsource/geist-mono@5.1.0/index.css" },
];

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
      <head>
        {fontLinks.map((link, i) => (
          <link key={i} {...link} />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
