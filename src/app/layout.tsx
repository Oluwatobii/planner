import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import { ClientLayout, SessionWrapper } from '@/components'

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
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-medium">
        <Themes>
          <SessionWrapper>
            <ApplicationWrapper>
              <ClientLayout>{children}</ClientLayout>
            </ApplicationWrapper>
          </SessionWrapper>
        </Themes>
      </body>
    </html>
  )
}
