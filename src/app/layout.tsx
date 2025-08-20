import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Starfield from '@/components/starfield';
import Header from '@/components/header';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Cosmic Compass',
  description: 'Explore the cosmos with FTL travel.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${sourceCodePro.variable}`} suppressHydrationWarning>
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
