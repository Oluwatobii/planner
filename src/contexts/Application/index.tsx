'use client'

import { createContext, useState, ReactNode } from 'react'

type Props = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  timezone: string
  setTimezone: (timezone: string) => void
}

export const AppContext = createContext<Props | undefined>(undefined)

export default function ApplicationWrapper({ children }: { children: ReactNode }) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const [searchQuery, setSearchQuery] = useState('')
  const [timezone, setTimezone] = useState(userTimezone)

  const value = {
    searchQuery,
    setSearchQuery,
    timezone,
    setTimezone
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
