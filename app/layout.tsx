import Auth from '@/auth/Auth';
import './globals.css';
import { Poppins } from 'next/font/google';
import ToastWrapper from '@/components/Toast/ToastWrapper';
import Sidebar from '@/components/Sidebar';
import SidebarMobile from '@/components/SidebarMobile';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata = {
  title: {
    default: 'Saw that band',
    template: '%s | Saw that band'
  },
  description: 'Manage the bands you have seen live',
  openGraph: {
    title: 'Saw that band',
    description: 'Manage the bands you have seen live',
    url: 'https://app.sawthat.band',
    siteName: 'Saw that band',
    images: [
      {
        url: 'https://www.sawthat.band/thumbnail.png'
      }
    ],
    locale: 'en-DE',
    type: 'website'
  },
  generator: 'Saw that band',
  applicationName: 'Saw that band',
  keywords: [
    'saw that band app',
    'seen that band app',
    'band catalog app',
    'concert catalog app',
    'bands seen live app'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: 'Saw that band',
    card: 'summary_large_image'
  },
  icons: {
    shortcut: '/favicon.ico'
  },
  verification: {
    google: 'ofTvVJZzZHEMRIXg6cCRslqaEnRO3cqrum3zjSZTDu0'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Auth>
      <html lang="en" className={font.className}>
        <body className="relative touch-none overflow-hidden bg-zinc-900 antialiased">
          <ToastWrapper>
            <main className="flex">
              <div className="flex max-h-screen">
                <div className="hidden sm:flex">
                  <Sidebar />
                </div>
              </div>
              <div className="h-[100dvh] w-full flex-1 flex-col gap-10 overflow-hidden bg-zinc-870 px-4 py-8 text-white sm:h-screen sm:px-12 sm:py-8">
                {children}
              </div>
            </main>
          </ToastWrapper>
          <div className="sm:hidden">
            <SidebarMobile />
          </div>
        </body>
      </html>
    </Auth>
  );
}
