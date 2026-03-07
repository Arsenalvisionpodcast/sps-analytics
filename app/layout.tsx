import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SPS Commerce Analytics | Retail Data Intelligence',
  description:
    'Transform fragmented retailer and channel data into clean, correlated, decision-ready intelligence. SPS Commerce delivers the analytics platform and data integration infrastructure your teams need.',
  keywords: [
    'retail analytics',
    'retail data',
    'data pipeline',
    'Snowflake integration',
    'SPS Commerce',
    'retail BI',
    'POS data',
    'supply chain analytics',
  ],
  openGraph: {
    title: 'SPS Commerce Analytics | Retail Data Intelligence',
    description:
      'From retailer chaos to strategic intelligence. SPS Commerce eliminates manual data collection so your teams can focus on insights, not wrangling.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-sps-surface">
        {children}
      </body>
    </html>
  );
}
