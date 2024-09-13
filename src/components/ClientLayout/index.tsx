'use client'

import { useState, useCallback } from 'react'

import { useSession } from 'next-auth/react'

import { Header, Spinner, PopupContainer } from '@/components'

import { PopupContextType, PopupComponent } from '@/lib/types'

import PopupContext from '@/contexts/Popup'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession()

  const [popupComponents, setPopupComponents] = useState<PopupComponent[]>([])

  const createPopup = useCallback<PopupContextType['createPopup']>(
    ({ title, content, className = '', closeable = false, style = {} }) =>
      new Promise(resolve => {
        const key = Math.random()
        const resolver = (data: unknown) => {
          setPopupComponents(popupComponents => popupComponents.filter(popupComponent => popupComponent.key !== key))
          resolve(data)
        }

        setPopupComponents(popupComponents => [
          { title, content, className, style, closeable, resolver, key },
          ...popupComponents
        ])
      }),
    []
  )

  const popupContextValue = { createPopup }

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
      <PopupContext.Provider value={popupContextValue}>
        <main className="flex-grow flex justify-center p-[10px] overflow-y-auto">{children}</main>
        <PopupContainer popupComponents={popupComponents} />
      </PopupContext.Provider>
    </div>
  )
}
