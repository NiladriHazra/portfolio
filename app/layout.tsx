import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} (Humi)`, template: `%s · ${site.name}` },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} (Humi)`,
    description: site.metaDescription,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", creator: "@byteHumi", images: ["/og.png"] },
  description: site.metaDescription,
  keywords: site.keywords,
  authors: [{ name: site.name }],
  creator: site.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
        {site.gaId && <GoogleAnalytics gaId={site.gaId} />}
      </body>
    </html>
  );
}
