import type { Metadata } from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
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
      className={`${outfit.variable} ${dmSans.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
