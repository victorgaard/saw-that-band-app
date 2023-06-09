import Auth from '@/auth/Auth';
import './globals.css';
import { Poppins } from 'next/font/google';
import ToastWrapper from '@/components/Toast/ToastWrapper';
import Sidebar from '@/components/Sidebar';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
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
              <div className="h-screen w-full flex-1 flex-col gap-10 overflow-hidden bg-zinc-870 px-4 py-8 text-white sm:px-12 sm:py-8">
                {children}
              </div>
            </main>
          </ToastWrapper>
        </body>
      </html>
    </Auth>
  );
}
