import { Spectral, IBM_Plex_Mono, Tiro_Bangla } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-spectral',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const tiroBangla = Tiro_Bangla({
  subsets: ['bengali', 'latin'],
  weight: ['400'],
  variable: '--font-tiro-bangla',
  display: 'swap',
});

export const metadata = {
  title: 'Jayan Zaman',
  description: 'Quantum Computing Specialist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spectral.variable} ${plexMono.variable} ${tiroBangla.variable}`}>
      <body className="min-h-screen flex flex-col font-serif bg-[var(--paper)] text-[var(--sumi)] antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

