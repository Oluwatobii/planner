import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import { Header, SessionWrapper } from '@/components'

import Themes from '@/contexts/Theme'

import ApplicationWrapper from '@/contexts/Application'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Planner',
  description: 'Plan your day, own your time.',
  icons: {
    icon: '/planner.svg'
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionWrapper>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} dark:bg-medium`}>
          <Themes>
            <ApplicationWrapper>
              <Header />
              <main className="flex justify-center p-[10px]">{children}</main>
            </ApplicationWrapper>
          </Themes>
        </body>
      </html>
    </SessionWrapper>
  )
}
