import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const headlineFont = Bebas_Neue({
  variable: "--font-headline",
  weight: "400",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const metadataBase = new URL(siteUrl);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "DMASKZIFY | Abuja-first digital radio and artist community",
    template: "%s | DMASKZIFY",
  },
  description:
    "DMASKZIFY is an Abuja-first digital radio and artist community where underground voices meet a live, youth-driven urban culture.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DMASKZIFY",
    title: "DMASKZIFY | Abuja-first digital radio and artist community",
    description:
      "DMASKZIFY is an Abuja-first digital radio and artist community where underground voices meet a live, youth-driven urban culture.",
    images: [
      {
        url: "/dmaskzify_favicon.png",
        alt: "DMASKZIFY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DMASKZIFY | Abuja-first digital radio and artist community",
    description:
      "DMASKZIFY is an Abuja-first digital radio and artist community where underground voices meet a live, youth-driven urban culture.",
    images: ["/dmaskzify_favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/dmaskzify_favicon.png",
    shortcut: "/dmaskzify_favicon.png",
    apple: "/dmaskzify_favicon.png",
  },
};

const siteStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DMASKZIFY",
    url: siteUrl,
    logo: `${siteUrl}/dmaskzify_logo.svg`,
    email: "hello@dmaskzify.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DMASKZIFY",
    url: siteUrl,
    inLanguage: "en",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headlineFont.variable} ${bodyFont.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
        />
        <div className="site-root">
          <SiteHeader />
          <div className="site-main">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
