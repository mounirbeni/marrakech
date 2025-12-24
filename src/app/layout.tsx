import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { WishlistProvider } from "@/lib/contexts/WishlistContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

// Configure fonts
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://marrakech-luxe.vercel.app'),
  title: {
    default: "Explore Marrakech like local",
    template: "%s | Explore Marrakech",
  },
  description: "Uncover the Secrets of Marrakech with trusted local guides. Authentic experiences, hand-picked tours, and unforgettable adventures in Morocco's Red City.",
  keywords: [
    "Marrakech",
    "Morocco",
    "Tours",
    "Experiences",
    "Travel",
    "Local Guides",
    "Desert Tours",
    "Moroccan Culture",
    "Authentic Travel",
    "Marrakech Activities",
  ],
  authors: [{ name: "Explore Marrakech" }],
  creator: "Explore Marrakech",
  publisher: "Explore Marrakech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marrakech-luxe.vercel.app",
    siteName: "Explore Marrakech like local",
    title: "Explore Marrakech like local",
    description: "Uncover the Secrets of Marrakech with trusted local guides. Authentic experiences, hand-picked tours, and unforgettable adventures.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Explore Marrakech like local",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Marrakech like local",
    description: "Uncover the Secrets of Marrakech with trusted local guides.",
    images: ["/opengraph-image"],
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>

      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <WishlistProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <PublicLayout>
              {children}
            </PublicLayout>
            <Toaster />
          </ThemeProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
