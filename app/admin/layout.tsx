'use client';

import { Inter } from 'next/font/google'
import { Providers } from '../providers'
import AdminNavbar from '@/components/admin/AdminNavbar'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/main_logo.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          {!isLoginPage && <AdminNavbar />}
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
} 