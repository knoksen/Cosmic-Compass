import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Starfield from '@/components/starfield';
import Header from '@/components/header';

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Source+Code+Pro:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen')}>
        <Starfield />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
