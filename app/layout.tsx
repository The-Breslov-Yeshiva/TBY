import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavigation } from "@/components/site-navigation";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thebreslovyeshiva.com"),
  title: {
    default: site.name,
    template: `%s | ${site.name}`
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    images: ["/yeshiva-logo-og.jpg"],
    type: "website"
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050713"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <SiteNavigation />
        <div className="site-shell">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
