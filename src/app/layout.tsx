import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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

export const metadata: Metadata = {
  title: {
    default: "DMASKZIFY | Abuja-first digital radio and artist community",
    template: "%s | DMASKZIFY",
  },
  description:
    "DMASKZIFY is an Abuja-first digital radio and artist community where underground voices meet a live, youth-driven urban culture.",
  icons: {
    icon: "/dmaskzify_favicon.png",
    shortcut: "/dmaskzify_favicon.png",
    apple: "/dmaskzify_favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headlineFont.variable} ${bodyFont.variable}`}>
        <div className="site-root">
          <SiteHeader />
          <div className="site-main">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
