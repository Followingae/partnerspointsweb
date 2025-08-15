import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { ModeProvider } from "@/context/mode-context"
import { Footer } from "@/components/layout/footer"
import { StructuredData } from "@/components/seo/structured-data"
import Navigation from "@/components/modern/Navigation"
import { SmoothScroll } from "@/components/gsap/smooth-scroll"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Partners Points | Reward smarter, not cheaper",
  description: "Replace blanket discounts with points that bring customers back—while you only pay on redeemed sales.",
  keywords: ["loyalty program", "customer rewards", "business points", "UAE", "merchant solutions"],
  authors: [{ name: "Partners Points" }],
  creator: "Partners Points",
  publisher: "Partners Points",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://partnerspoints.com"),
  icons: {
    icon: '/partnerspointsfavicon.png',
    shortcut: '/partnerspointsfavicon.png',
    apple: '/partnerspointsfavicon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Partners Points | Reward smarter, not cheaper",
    description: "Replace blanket discounts with points that bring customers back—while you only pay on redeemed sales.",
    siteName: "Partners Points",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners Points | Reward smarter, not cheaper",
    description: "Replace blanket discounts with points that bring customers back—while you only pay on redeemed sales.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0a2540" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <ModeProvider>
          <SmoothScroll>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ModeProvider>
      </body>
    </html>
  )
}