'use client';
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import NavBar from '~/components/UI/Nav';
import AuthProvider from '~/lib/AuthProvider';
import SideModalProvider from '~/providers/SideModalProvider';
import { ToastNotifications } from '~/components/UI/ToastNotifications';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <ToastNotifications /> */}
      <AuthProvider>
        <SideModalProvider>
          <html lang='en' className='h-full w-full'>
            <body className='h-full w-full'>
              <div className='w-full h-full flex flex-col md:flex-row overflow-y-clip'>
                <NavBar />
                <main className='bg-gray-50 dark:bg-[#141625] transition h-[100%] w-full overflow-y-scroll flex justify-center'>
                  {children}
                </main>
              </div>
            </body>
          </html>
        </SideModalProvider>
      </AuthProvider>
    </>
  );
}
