'use client'

import { useSession } from 'next-auth/react'

import { Header, Spinner } from '@/components'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession()

  if (status === 'loading') {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <>
        <main className="flex-grow flex justify-center p-[10px] overflow-y-auto">{children}</main>
      </>
    </div>
  )
}
