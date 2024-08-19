'use client'

import { createContext, useState, ReactNode } from 'react'

type Props = {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const AppContext = createContext<Props | undefined>(undefined)

export default function ApplicationWrapper({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')

  const value = {
    searchQuery,
    setSearchQuery
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
