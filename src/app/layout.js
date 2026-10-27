import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import SidebarAds from '@/app/components/SidebarAds/SidebarAds';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://ferixsoftware.pro'),
  title: 'Ferix Software - Professional Trading Dashboard',
  description: 'Ferix Software provides advanced trading signals and professional tools for modern traders.',
  keywords: [
    'Ferix Software',
    'Ferix Trading',
    'Advanced Trading Software',
    'Real-time Signals',
    'Professional Trading Tools',
    'Trading Platform',
    'Trading Software',
    'AI Trading Signals',
    'Market Analysis',
    'Trading Dashboard',
    'Forex Signals',
    'Crypto Trading',
    'Binary Options Signals',
    'Quotex Signals',
    'Pocket Option Signals',
    'Forex Trading Tools',
    'Live Trading Signals'
  ],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Ferix Software - Trading Dashboard',
    description: 'Professional trading signals and tools.',
    url: 'https://ferixsoftware.pro',
    siteName: 'Ferix Software',
    images: [
      {
        url: 'https://ferixsoftware.pro/assets/images/anzal-hero.webp',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="scroll-smooth bg-gray-50 flex flex-col min-h-screen overflow-x-hidden">
        <Header />

        {/* Main Wrapper */}
        <div className="w-full max-w-[1800px] mx-auto px-4 flex justify-between items-start">
          {/* Ads Left */}
          <SidebarAds position="left" />

          {/* Main Content */}
          <main className="flex-1 w-full max-w-[1200px] overflow-hidden">
            {children}
          </main>

          {/* Ads Right */}
          <SidebarAds position="right" />
        </div>

        <Footer />
      </body>
    </html>
  );
}