import React from "react";
import type { Metadata, Viewport } from "next";
import { Caveat } from "next/font/google";
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StarsCanvas from '@/components/StarBackground'
import ToastProvider from '@/components/ToastProvider'
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_NAME, SITE_URL } from "@/lib/metadata";
import './globals.css'

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
})


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Supun Sathsara · Software Engineer",
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "A Developer based in Sri Lanka, specializing in building exceptional websites, applications, and everything in between.",
  keywords: [
    "supun sathsara",
    "savindu",
    "Web Developer",
    "Software Engineer",
    "Node.js",
    "Express.js",
    "Next.js",
    "Python",
    "SQL",
    "NoSQL",
    "Tailwind",
    "Redis",
    "Responsive Web Design",
    "Cybersecurity",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} · Software Engineer`,
    description:
      "A Developer specializing in building exceptional websites, applications, and everything in between.",
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} · Software Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ssupunsathsara",
    creator: "@ssupunsathsara",
    title: `${SITE_NAME} · Software Engineer`,
    description:
      "A Developer specializing in building exceptional websites, applications, and everything in between.",
    images: ["/social-card.png"],
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
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon/dark/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/dark/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      {
        url: "/favicon/dark/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/favicon/dark/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/favicon/dark/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/favicon/dark/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/favicon/dark/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/favicon/dark/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/favicon/dark/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/favicon/dark/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/favicon/dark/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/favicon/dark/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#030014',
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Savindu Supun Sathsara",
  "url": SITE_URL,
  "jobTitle": "Software Engineer",
  "description":
    "Top Software Engineer and Web Developer in Sri Lanka. Specializes in Next.js, React, Node.js, and Python.",
  "nationality": {
    "@type": "Country",
    "name": "Sri Lanka",
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "National Institute of Business Management",
  },
  "knowsAbout": [
    "Software Engineering",
    "Web Development",
    "React",
    "Next.js",
    "Python",
    "Ballerina",
    "Cybersecurity",
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "LK",
  },
  "sameAs": [
    "https://github.com/supunsathsara",
    "https://www.linkedin.com/in/supunsathsara/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "url": SITE_URL,
  "description":
    "Portfolio of Supun Sathsara · Software Engineer and Web Developer based in Sri Lanka.",
  "publisher": {
    "@type": "Person",
    "name": "Savindu Supun Sathsara",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={caveat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema]),
          }}
        />
      </head>
      <body className='overflow-x-hidden'>
        <ToastProvider>
          <main className="flex min-h-screen flex-col bg-[#030014] scroll-smooth">
            <StarsCanvas />
            <div className='z-10'>
              <Navbar />
              {children}
              <Footer />
            </div>
          </main>
        </ToastProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
