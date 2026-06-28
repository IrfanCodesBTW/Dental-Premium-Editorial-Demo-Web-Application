import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'FMS Dental — World-Class Dental Implants & Smile Makeovers in Hyderabad',
    template: '%s | FMS Dental Hyderabad',
  },
  description:
    'FMS Dental is Hyderabad\'s premier NABH-accredited dental group with 6 clinics. Specialists in dental implants, smile makeovers, Invisalign, and full mouth rehabilitation. Trusted by 50,000+ patients including international dental tourists.',
  keywords: [
    'dental implants Hyderabad',
    'smile makeover Hyderabad',
    'best dentist Hyderabad',
    'Invisalign Hyderabad',
    'NABH dental clinic',
    'dental tourism India',
    'FMS Dental',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fmsdental.com',
    siteName: 'FMS Dental',
    title: 'FMS Dental — World-Class Dental Care in Hyderabad',
    description:
      'NABH-accredited dental group with 6 clinics across Hyderabad. Dental implants, smile makeovers, orthodontics, and more.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-body)' }}>
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
