import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IPM - International Property Management | Mexico Real Estate Investment",
  description: "Professional property management services in Mexico. 10+ years experience, 30+ properties managed, 75-85% occupancy rates. Expert vacation rental management in Riviera Maya, Playa del Carmen, and Tulum.",
  keywords: "Mexico property management, vacation rental management, Riviera Maya, Playa del Carmen, Tulum, real estate investment Mexico",
  authors: [{ name: "IPM International Property Management" }],
  creator: "IPM International Property Management",
  publisher: "IPM International Property Management",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ipm.services'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "IPM - International Property Management",
    description: "Professional property management services in Mexico. Expert vacation rental management with proven 75-85% occupancy rates.",
    url: 'https://ipm.services',
    siteName: 'IPM International Property Management',
    images: [
      {
        url: '/logo.png',
        width: 400,
        height: 400,
        alt: 'IPM International Property Management Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "IPM - International Property Management",
    description: "Professional property management services in Mexico. Expert vacation rental management with proven results.",
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#0b6cff" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

