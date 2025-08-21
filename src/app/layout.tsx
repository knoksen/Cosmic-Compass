import type { Metadata } from 'next';
import './globals.css';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Starfield from '@/components/starfield';
import Header from '@/components/header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cosmic Compass',
  description: 'Explore the cosmos with FTL travel.',
  metadataBase: new URL('http://localhost:9002'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('dark', inter.variable, sourceCodePro.variable)} suppressHydrationWarning>
      <body className={cn('font-body antialiased min-h-screen')}>
        <Starfield />
        <Header />
        <main className="relative z-10 flex-1 container mx-auto px-4 pt-24 pb-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
