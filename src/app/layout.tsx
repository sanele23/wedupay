import type { Metadata } from 'next';
import { Inter, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['400', '500', '600', '700', '900'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | WeduPay',
    default: 'WeduPay — Tuition Payments for BYU-Pathway Zimbabwe',
  },
  description:
    'Seamless tuition payments for BYU-Pathway students in Zimbabwe. Bridge the gap between local currency and global education with precision.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white antialiased">{children}</body>
    </html>
  );
}
