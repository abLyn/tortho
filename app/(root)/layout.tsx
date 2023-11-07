import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import '../globals.css'
import { inter, roboto } from '@/providers/fonts'

import Header from '@/components/header/Header'
import SessionProvider from '@/providers/SessionProvider'

import { Toaster } from '@/components/ui/toaster'

import RightSidebar from '@/components/RightSidebar'
import LeftSidebar from '@/components/leftSidebar/LeftSidebar'
import ThemeProvider from '@/providers/ThemeProvider'
import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/login')
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <SessionProvider session={session}>
            <Header />
            <main className="flex flex-row  ">
              <LeftSidebar />
              <section className="flex min-h-screen flex-1 flex-col items-center  px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
                <div className="w-full max-w-7xl">{children}</div>
              </section>
            </main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
