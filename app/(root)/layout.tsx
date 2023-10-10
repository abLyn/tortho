import Sidebar from '@/components/leftSidebar/LeftSidebar'
import '../globals.css'
import { getServerSession } from 'next-auth'

import SessionProvider from '@/providers/SessionProvider'
import Header from '@/components/header/Header'

import ThemeProvider from '@/providers/ThemeProvider'
import type { Metadata } from 'next'
import { Inter, Roboto, Open_Sans, Source_Sans_3 } from 'next/font/google'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})
const open_sans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})
const source_sans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session?.user) {
    redirect('/login')
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={source_sans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <Header />
            <main className="flex flex-row  ">
              <Sidebar />
              <section className="flex min-h-screen flex-1 flex-col items-center  px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
                <div className="w-full max-w-4xl">{children}</div>
              </section>
            </main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
