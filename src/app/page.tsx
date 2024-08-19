'use client'

import { useContext } from 'react'

import { AppContext } from '@/contexts/Application'

export default function Home() {
  const context = useContext(AppContext)

  console.log({ context })
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <h1 className="text-2xl font-bold text-grey-900 dark:text-white">Landing Page</h1>
    </div>
  )
}
