import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sell Your Unused Diabetic Test Strips | Atlas DTS",
  description:
    "Turn your unused, unopened diabetic testing supplies into cash. Atlas DTS offers competitive quotes, fast payment, and a hassle-free process. Get your free quote today.",
  keywords:
    "sell diabetic test strips, sell unused test strips, we buy diabetic supplies, sell CGM sensors, sell Dexcom, sell FreeStyle Libre, sell OneTouch strips",
  openGraph: {
    title: "Sell Your Unused Diabetic Test Strips | Atlas DTS",
    description:
      "Turn your unused, unopened diabetic testing supplies into cash. Atlas DTS offers competitive quotes, fast payment, and a hassle-free process. Get your free quote today.",
    url: SITE_URL,
    siteName: "Atlas DTS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your Unused Diabetic Test Strips | Atlas DTS",
    description:
      "Turn your unused, unopened diabetic testing supplies into cash. Atlas DTS offers competitive quotes, fast payment, and a hassle-free process. Get your free quote today.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Atlas DTS",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description:
    "We purchase unopened, unexpired diabetic testing supplies from individuals across the United States.",
  areaServed: "US",
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-light-grey text-dark-navy">
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
