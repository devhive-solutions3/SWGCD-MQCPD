'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import { Providers } from './providers'
import Footer from '@/components/footer'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const hideNavAndFooter = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/main_logo.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          {!hideNavAndFooter && <Navbar />}
          {children}
          {!hideNavAndFooter && <Footer />}
        </Providers>
      </body>
    </html>
  )
}
